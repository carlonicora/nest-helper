export class Router {
	private static _microservices(): Map<string, string> {
		if (process.env.API_VERSIONS === undefined) return undefined;

		const result = new Map<string, string>();

		const keyValuePairs = process.env.API_VERSIONS.split(";").filter(Boolean);

		for (const pair of keyValuePairs) {
			const [key, value] = pair.split(":");
			if (key && value) {
				result.set(key, value);
			}
		}

		return result;
	}

	static getUrl(microservice?: string) {
		const url: string = process.env.API_URL;
		const microservices = this._microservices();

		if (!microservice || !microservices) return url;

		const versions: Map<string, string> = microservices;
		return `${url}v${versions.get(microservice)}/`;
	}
}
