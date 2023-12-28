"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
class Router {
    static _microservices() {
        if (process.env.API_VERSIONS === undefined)
            return undefined;
        const result = new Map();
        const keyValuePairs = process.env.API_VERSIONS.split(";").filter(Boolean);
        for (const pair of keyValuePairs) {
            const [key, value] = pair.split(":");
            if (key && value) {
                result.set(key, value);
            }
        }
        return result;
    }
    static getUrl(microservice) {
        const url = process.env.API_URL;
        const microservices = this._microservices();
        if (!microservice || !microservices)
            return url;
        const versions = microservices;
        return `${url}v${versions.get(microservice)}/`;
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map