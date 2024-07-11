"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiBuilder = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../index");
class JsonApiBuilder {
    constructor(query) {
        this._paginationCount = 25;
        this._pagination = {};
        this._additionalParams = "";
        if (!query)
            return;
        this._additionalParams = Object.keys(query)
            .filter((key) => key !== "page[size]" &&
            key !== "page[before]" &&
            key !== "page[after]")
            .map((key) => `${key}=${query[key]}`)
            .join("&");
        if (this._additionalParams.length > 0)
            this._additionalParams = "&" + this._additionalParams;
        if (query?.["page[size]"])
            this._pagination.size = +query["page[size]"];
        if (query?.["page[before]"])
            this._pagination.before = query["page[before]"];
        if (query?.["page[after]"])
            this._pagination.after = query["page[after]"];
    }
    get size() {
        return (this._pagination?.size ?? this._paginationCount) + 1;
    }
    buildSingle(builder, record) {
        if (!record)
            throw new common_1.HttpException(`not found`, common_1.HttpStatus.NOT_FOUND);
        if (typeof record[`${builder.id}`] === "string")
            return this.serialise(record, builder.create(), `${process.env.API_URL}${builder.endpoint}/${record[`${builder.id}`]}`);
        return this.serialise(record, builder.create(), `${process.env.API_URL}${builder.endpoint}/${(0, index_1.bufferToUuid)(record[`${builder.id}`])}`);
    }
    buildList(builder, records) {
        return this.serialise(records, builder.create(), `${process.env.API_URL}${builder.endpoint}${builder.endpointParameters}`, `${builder.id}`);
    }
    generateCursor() {
        const cursor = {
            cursor: undefined,
            take: this.size,
        };
        if (this._pagination.before) {
            cursor.cursor = this._pagination.before;
            cursor.take = -this.size;
        }
        else if (this._pagination.after) {
            cursor.cursor = this._pagination.after;
            cursor.take = this.size;
        }
        return cursor;
    }
    updatePagination(data, idName) {
        if (!this._pagination.idName)
            this._pagination.idName = idName ?? "id";
        const hasEnoughData = data.length === this.size;
        if (!this._pagination.before && !this._pagination.after && hasEnoughData) {
            if (typeof data[data.length - 1][this._pagination.idName] === "string")
                this._pagination.after = data[data.length - 1][this._pagination.idName];
            else
                this._pagination.after = (0, index_1.bufferToUuid)(data[data.length - 1][this._pagination.idName]);
            return;
        }
        if (this._pagination.before) {
            this._pagination.after = this._pagination.before;
            if (hasEnoughData) {
                if (typeof data[0][this._pagination.idName] === "string")
                    this._pagination.before = data[0][this._pagination.idName];
                else
                    this._pagination.before = (0, index_1.bufferToUuid)(data[0][this._pagination.idName]);
            }
            return;
        }
        this._pagination.before = this._pagination.after;
        if (hasEnoughData) {
            if (typeof data[data.length - 1][this._pagination.idName] === "string")
                this._pagination.after = data[data.length - 1][this._pagination.idName];
            else
                this._pagination.after = (0, index_1.bufferToUuid)(data[data.length - 1][this._pagination.idName]);
        }
    }
    _addToIncluded(includedElements, newElements) {
        const uniqueIdentifiers = new Set(includedElements.map((e) => `${e.type}-${e.id}`));
        newElements.forEach((element) => {
            const identifier = `${element.type}-${element.id}`;
            if (!uniqueIdentifiers.has(identifier)) {
                includedElements.push(element);
                uniqueIdentifiers.add(identifier);
            }
        });
    }
    serialise(data, builder, url, idName) {
        const response = {
            links: {
                self: url,
            },
            data: undefined,
        };
        if (Array.isArray(data) && data.length <= this.size) {
            if (url) {
                if (Array.isArray(data) && !this._pagination)
                    this._pagination = {
                        size: this._paginationCount,
                    };
                if (this._pagination && Array.isArray(data)) {
                    this.updatePagination(data, idName);
                    if (!this._pagination.size)
                        this._pagination.size = this._paginationCount;
                    if (data.length === this.size) {
                        response.links.self =
                            url +
                                (url.indexOf("?") === -1 ? "?" : "&") +
                                `page[size]=${this._pagination.size.toString()}${this._additionalParams}`;
                        if (this._pagination.after) {
                            response.links.next =
                                url +
                                    (url.indexOf("?") === -1 ? "?" : "&") +
                                    `page[size]=${this._pagination.size.toString()}&page[after]=${this._pagination.after}${this._additionalParams}`;
                        }
                        data.splice(this._pagination.size, 1);
                    }
                    if (this._pagination.before) {
                        response.links.prev =
                            url +
                                (url.indexOf("?") === -1 ? "?" : "&") +
                                `page[size]=${this._pagination.size.toString()}&page[before]=${this._pagination.before}${this._additionalParams}`;
                    }
                }
            }
            else {
                delete response.links;
            }
        }
        let included = [];
        if (Array.isArray(data)) {
            const serialisedResults = data.map((item) => this.serialiseData(item, builder));
            response.data = serialisedResults.map((result) => result.serialisedData);
            this._addToIncluded(included, [].concat(...serialisedResults.map((result) => result.includedElements)));
        }
        else {
            const { serialisedData, includedElements } = this.serialiseData(data, builder);
            response.data = serialisedData;
            this._addToIncluded(included, includedElements);
        }
        if (included.length > 0) {
            response.included = included;
        }
        return response;
    }
    serialiseData(data, builder) {
        const includedElements = [];
        const serialisedData = {
            type: builder.type,
        };
        if (typeof builder.id === "function") {
            serialisedData.id = builder.id(data);
        }
        else {
            serialisedData.id = data[builder.id];
        }
        if (builder.links) {
            serialisedData.links = {
                self: builder.links.self(data),
            };
        }
        serialisedData.attributes = {};
        Object.keys(builder.attributes).forEach((attribute) => {
            if (typeof builder.attributes[attribute] === "function") {
                serialisedData.attributes[attribute] =
                    builder.attributes[attribute](data);
            }
            else {
                serialisedData.attributes[attribute] = data[attribute];
            }
        });
        if (builder.meta) {
            serialisedData.meta = {};
            Object.keys(builder.meta).forEach((meta) => {
                if (typeof builder.meta[meta] === "function") {
                    serialisedData.meta[meta] = builder.meta[meta](data);
                }
                else {
                    serialisedData.meta[meta] = data[meta];
                }
            });
        }
        if (builder.relationships) {
            serialisedData.relationships = {};
            Object.entries(builder.relationships).forEach((relationship) => {
                let resourceLinkage = {};
                const manyToManyRelationships = relationship[0].split("__");
                if (relationship[1].resourceIdentifier) {
                    const minimalData = {
                        type: relationship[1].resourceIdentifier.type,
                    };
                    try {
                        if (typeof relationship[1].resourceIdentifier.id === "function") {
                            minimalData.id = relationship[1].resourceIdentifier.id(data);
                        }
                        else {
                            minimalData.id = data[relationship[1].resourceIdentifier.id];
                        }
                        resourceLinkage = {
                            data: minimalData,
                        };
                        if (relationship[1].links) {
                            resourceLinkage.links = {
                                related: relationship[1].links.related(data),
                            };
                        }
                        serialisedData.relationships[relationship[1].name ?? relationship[0]] = resourceLinkage;
                    }
                    catch (e) { }
                }
                else if (data[relationship[0]]) {
                    const { minimalData, relationshipLink, additionalIncludeds } = this.serialiseRelationship(data[relationship[0]], relationship[1].data.create());
                    resourceLinkage = {
                        data: minimalData,
                    };
                    if (relationshipLink) {
                        resourceLinkage.links = relationshipLink;
                    }
                    else if (relationship[1].links) {
                        resourceLinkage.links = {
                            related: relationship[1].links.related(data),
                        };
                    }
                    if (relationship[1].included && additionalIncludeds.length > 0)
                        includedElements.push(...additionalIncludeds);
                    serialisedData.relationships[relationship[1].name ?? relationship[0]] = resourceLinkage;
                }
                else if (manyToManyRelationships.length > 1 &&
                    data[manyToManyRelationships[0]] !== undefined &&
                    data[manyToManyRelationships[0]].length > 0) {
                    serialisedData.relationships[relationship[1].name ?? relationship[0]] = { data: [] };
                    data[manyToManyRelationships[0]].forEach((item) => {
                        const { minimalData, relationshipLink, additionalIncludeds } = this.serialiseRelationship(item[manyToManyRelationships[1]], relationship[1].data.create());
                        if (relationship[1].included && additionalIncludeds.length > 0)
                            includedElements.push(...additionalIncludeds);
                        if (relationship[1].forceSingle === true) {
                            serialisedData.relationships[relationship[1].name ?? relationship[0]] = { data: minimalData };
                        }
                        else {
                            serialisedData.relationships[relationship[1].name ?? relationship[0]].data.push(minimalData);
                        }
                    });
                }
                else if (relationship[1].links) {
                    const related = relationship[1].links.related(data);
                    if (related) {
                        resourceLinkage.links = {
                            related: related,
                        };
                        serialisedData.relationships[relationship[1].name ?? relationship[0]] = resourceLinkage;
                    }
                }
            });
            if (Object.keys(serialisedData.relationships).length === 0)
                delete serialisedData.relationships;
        }
        return {
            serialisedData: serialisedData,
            includedElements: includedElements,
        };
    }
    serialiseRelationship(data, builder) {
        const response = {
            minimalData: undefined,
            relationshipLink: undefined,
            additionalIncludeds: [],
        };
        if (Array.isArray(data)) {
            const serialisedResults = data.map((item) => this.serialiseData(item, builder));
            const serialisedData = serialisedResults.map((result) => result.serialisedData);
            const includedElements = serialisedResults
                .map((result) => result.includedElements)
                .flat();
            response.minimalData = serialisedData.map((result) => {
                return { type: result.type, id: result.id };
            });
            this._addToIncluded(response.additionalIncludeds, includedElements.concat(serialisedData));
        }
        else {
            const { serialisedData, includedElements } = this.serialiseData(data, builder);
            response.minimalData = {
                type: serialisedData.type,
                id: serialisedData.id,
            };
            if (serialisedData.links) {
                response.relationshipLink = {
                    self: serialisedData.links.self,
                };
            }
            this._addToIncluded(response.additionalIncludeds, [
                ...includedElements,
                serialisedData,
            ]);
        }
        return response;
    }
}
exports.JsonApiBuilder = JsonApiBuilder;
//# sourceMappingURL=JsonApiBuilder.js.map