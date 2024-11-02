"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractJsonApiSerialiser = void 0;
const uuid_1 = require("../../lib/uuid");
class AbstractJsonApiSerialiser {
    constructor() {
        this._attributes = {};
        this._meta = {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        };
        this._links = {
            self: (data) => {
                return `${process.env.API_URL}${this.endpoint}/${(0, uuid_1.bufferToUuid)(data[this.id])}`;
            },
        };
        this._relationships = {};
        this._endpoint =
            Reflect.getMetadata("endpoint", this.constructor) ??
                this._getDefaultType();
        this._id =
            Reflect.getMetadata("id", this.constructor) ?? this._getDefaultId();
    }
    _getDefaultType() {
        return this.type;
    }
    _getDefaultId() {
        return this.id;
    }
    get type() {
        return this.type || this._getDefaultType();
    }
    get id() {
        return this._id || this._getDefaultId();
    }
    get endpoint() {
        return this._endpoint || this._getDefaultType();
    }
    get endpointParameters() {
        return "";
    }
    set attributes(attributes) {
        this._attributes = attributes;
    }
    set meta(meta) {
        this._meta = {
            ...this._meta,
            ...meta,
        };
    }
    set links(links) {
        this._links = links;
    }
    set relationships(relationships) {
        this._relationships = relationships;
    }
    create() {
        return {
            type: this._endpoint,
            id: (data) => {
                return (0, uuid_1.bufferToUuid)(data[this.id]);
            },
            attributes: this._attributes,
            meta: this._meta,
            relationships: this._relationships,
            links: this._links,
        };
    }
}
exports.AbstractJsonApiSerialiser = AbstractJsonApiSerialiser;
//# sourceMappingURL=AbstractJsonApiSerialiser.js.map