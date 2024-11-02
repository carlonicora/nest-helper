"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractJsonApiSerialiser = void 0;
const src_1 = require("src");
class AbstractJsonApiSerialiser {
    constructor() {
        this._endpoint =
            Reflect.getMetadata("endpoint", this.constructor) ??
                this.getDefaultType();
        this._id =
            Reflect.getMetadata("id", this.constructor) ?? this.getDefaultId();
    }
    getDefaultType() {
        return this.type;
    }
    getDefaultId() {
        return this.id;
    }
    get type() {
        return this.type || this.getDefaultType();
    }
    get id() {
        return this._id || this.getDefaultId();
    }
    get endpoint() {
        return this._endpoint || this.getDefaultType();
    }
    get endpointParameters() {
        return "";
    }
    create() {
        return {
            type: this._endpoint,
            id: "",
            attributes: {},
            meta: {
                createdAt: "createdAt",
                updatedAt: "updatedAt",
            },
            relationships: {},
            links: {
                self: (data) => {
                    return `${process.env.API_URL}${this.endpoint}/${(0, src_1.bufferToUuid)(data[this.id])}`;
                },
            },
        };
    }
}
exports.AbstractJsonApiSerialiser = AbstractJsonApiSerialiser;
//# sourceMappingURL=AbstractJsonApiSerialiser.js.map