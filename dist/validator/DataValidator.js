"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidator = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DataValidator {
    static async validateAndTransformDto(dtoClass, data) {
        const response = (0, class_transformer_1.plainToClass)(dtoClass, data);
        const errors = await (0, class_validator_1.validate)(response);
        if (errors.length > 0) {
            throw new common_1.HttpException({
                message: this._formatErrors(errors),
                error: "A server-side error occurred.",
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }
    static _formatErrors(errors, parentPropertyPath = "") {
        let formattedErrors = [];
        errors.forEach((error) => {
            const propertyPath = parentPropertyPath ? `${parentPropertyPath}.${error.property}` : error.property;
            if (error.constraints) {
                Object.values(error.constraints).forEach((constraint) => {
                    formattedErrors.push(`${propertyPath} ${constraint}`);
                });
            }
            if (error.children && error.children.length > 0) {
                formattedErrors = formattedErrors.concat(this._formatErrors(error.children, propertyPath));
            }
        });
        return formattedErrors;
    }
}
exports.DataValidator = DataValidator;
//# sourceMappingURL=DataValidator.js.map