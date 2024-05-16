"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let JsonApiPipe = class JsonApiPipe {
    constructor(classType) {
        this.classType = classType;
    }
    async transform(value) {
        return await this._validate(this.classType, value);
    }
    async _validate(type, jsonApi) {
        const response = (0, class_transformer_1.plainToClass)(type, jsonApi);
        const validationErrors = await (0, class_validator_1.validate)(response);
        if (validationErrors.length > 0) {
            const errors = this._extractErrors(validationErrors);
            throw new common_1.BadRequestException(errors);
        }
        return response;
    }
    _extractErrors(errors, parentPath = "") {
        let errorMessages = [];
        function buildPath(error, path) {
            if (!error.children || error.children.length === 0) {
                return path;
            }
            const childPath = error.children
                .map((child) => {
                const key = Object.keys(child.target || {}).find((key) => child.target[key] instanceof Object);
                return key ? `${path}.${key}` : path;
            })
                .join("");
            return childPath;
        }
        errors.forEach((error) => {
            const initialPath = parentPath
                ? `${parentPath}.${error.property}`
                : error.property;
            const fullPath = buildPath(error, initialPath);
            if (error.constraints) {
                Object.values(error.constraints).forEach((message) => {
                    errorMessages.push(`${fullPath}: ${message}`);
                });
            }
            if (error.children && error.children.length > 0) {
                errorMessages = errorMessages.concat(this._extractErrors(error.children, fullPath));
            }
        });
        return errorMessages;
    }
};
exports.JsonApiPipe = JsonApiPipe;
exports.JsonApiPipe = JsonApiPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], JsonApiPipe);
//# sourceMappingURL=JsonApiPipe.js.map