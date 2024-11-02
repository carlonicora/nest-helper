"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiSerialiserOptions = exports.AbstractJsonApiSerialiser = exports.uuidToBuffer = exports.isValidUuid = exports.bufferToUuid = exports.JsonApiPipe = exports.createSlug = exports.DataValidator = exports.JsonApiBuilder = exports.Router = exports.OptionalJwtAuthGuard = exports.JwtStrategy = exports.JwtAuthGuard = exports.AuthModule = exports.JsonApiNavigator = exports.Imgix = void 0;
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
var Router_1 = require("./routing/Router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return Router_1.Router; } });
var JsonApiBuilder_1 = require("./serialisers/JsonApiBuilder");
Object.defineProperty(exports, "JsonApiBuilder", { enumerable: true, get: function () { return JsonApiBuilder_1.JsonApiBuilder; } });
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
var JsonApiPipe_1 = require("./jsonApi/JsonApiPipe");
Object.defineProperty(exports, "JsonApiPipe", { enumerable: true, get: function () { return JsonApiPipe_1.JsonApiPipe; } });
var uuid_1 = require("./lib/uuid");
Object.defineProperty(exports, "bufferToUuid", { enumerable: true, get: function () { return uuid_1.bufferToUuid; } });
Object.defineProperty(exports, "isValidUuid", { enumerable: true, get: function () { return uuid_1.isValidUuid; } });
Object.defineProperty(exports, "uuidToBuffer", { enumerable: true, get: function () { return uuid_1.uuidToBuffer; } });
var AbstractJsonApiSerialiser_1 = require("./serialisers/abstracts/AbstractJsonApiSerialiser");
Object.defineProperty(exports, "AbstractJsonApiSerialiser", { enumerable: true, get: function () { return AbstractJsonApiSerialiser_1.AbstractJsonApiSerialiser; } });
var JsonApiSerialiserOptions_1 = require("./serialisers/decorators/JsonApiSerialiserOptions");
Object.defineProperty(exports, "JsonApiSerialiserOptions", { enumerable: true, get: function () { return JsonApiSerialiserOptions_1.JsonApiSerialiserOptions; } });
//# sourceMappingURL=index.js.map