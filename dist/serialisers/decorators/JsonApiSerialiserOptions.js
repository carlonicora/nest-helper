"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiSerialiserOptions = void 0;
require("reflect-metadata");
function JsonApiSerialiserOptions(options) {
    return (target) => {
        Reflect.defineMetadata("endpoint", options.endpoint, target);
        Reflect.defineMetadata("id", options.id, target);
    };
}
exports.JsonApiSerialiserOptions = JsonApiSerialiserOptions;
//# sourceMappingURL=JsonApiSerialiserOptions.js.map