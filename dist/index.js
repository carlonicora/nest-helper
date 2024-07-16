"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiPipe = exports.bufferToUuid = exports.uuidToBuffer = exports.isValidUuid = exports.createSlug = exports.DataValidator = exports.Router = exports.JsonApiBuilder = exports.OptionalJwtAuthGuard = exports.JwtStrategy = exports.JwtAuthGuard = exports.AuthModule = exports.JsonApiNavigator = exports.Imgix = void 0;
const common_1 = require("@nestjs/common");
var Imgix_1 = require("./imgix/Imgix");
Object.defineProperty(exports, "Imgix", { enumerable: true, get: function () { return Imgix_1.Imgix; } });
var JsonApiNavigator_1 = require("./jsonApi/JsonApiNavigator");
Object.defineProperty(exports, "JsonApiNavigator", { enumerable: true, get: function () { return JsonApiNavigator_1.JsonApiNavigator; } });
var auth_module_1 = require("./auth/auth.module");
Object.defineProperty(exports, "AuthModule", { enumerable: true, get: function () { return auth_module_1.AuthModule; } });
var jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
Object.defineProperty(exports, "JwtAuthGuard", { enumerable: true, get: function () { return jwt_auth_guard_1.JwtAuthGuard; } });
var jwt_strategy_1 = require("./auth/jwt.strategy");
Object.defineProperty(exports, "JwtStrategy", { enumerable: true, get: function () { return jwt_strategy_1.JwtStrategy; } });
var optional_jwt_auth_guard_1 = require("./auth/optional-jwt-auth.guard");
Object.defineProperty(exports, "OptionalJwtAuthGuard", { enumerable: true, get: function () { return optional_jwt_auth_guard_1.OptionalJwtAuthGuard; } });
var JsonApiBuilder_1 = require("./jsonApi/JsonApiBuilder");
Object.defineProperty(exports, "JsonApiBuilder", { enumerable: true, get: function () { return JsonApiBuilder_1.JsonApiBuilder; } });
var Router_1 = require("./routing/Router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return Router_1.Router; } });
var DataValidator_1 = require("./validator/DataValidator");
Object.defineProperty(exports, "DataValidator", { enumerable: true, get: function () { return DataValidator_1.DataValidator; } });
function createSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
        .substring(0, 75);
}
exports.createSlug = createSlug;
function isValidUuid(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}
exports.isValidUuid = isValidUuid;
function uuidToBuffer(uuid) {
    if (!isValidUuid(uuid)) {
        throw new common_1.HttpException("Invalid UUID format", common_1.HttpStatus.BAD_REQUEST);
    }
    const hex = uuid.replace(/-/g, "");
    return Buffer.from(hex, "hex");
}
exports.uuidToBuffer = uuidToBuffer;
function bufferToUuid(buffer) {
    const hex = buffer.toString("hex");
    const uuid = [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20, 32),
    ].join("-");
    if (!isValidUuid(uuid)) {
        throw new common_1.HttpException("Invalid UUID format", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return uuid;
}
exports.bufferToUuid = bufferToUuid;
var JsonApiPipe_1 = require("./jsonApi/JsonApiPipe");
Object.defineProperty(exports, "JsonApiPipe", { enumerable: true, get: function () { return JsonApiPipe_1.JsonApiPipe; } });
//# sourceMappingURL=index.js.map