"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonApiSerialiserOptions = JsonApiSerialiserOptions;
require("reflect-metadata");
function JsonApiSerialiserOptions(options) {
    return (target) => {
        Reflect.defineMetadata("endpoint", options.endpoint, target);
        Reflect.defineMetadata("id", options.id, target);
    };
}
//# sourceMappingURL=JsonApiSerialiserOptions.js.map