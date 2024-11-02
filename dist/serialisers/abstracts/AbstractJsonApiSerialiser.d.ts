import { JsonApiDataInterface } from "src/jsonApi/interfaces/JsonApiDataInterface";
import { JsonApiBuilderInterface } from "src/serialisers/interfaces/JsonApiBuilderInterface";
export declare abstract class AbstractJsonApiSerialiser implements JsonApiBuilderInterface {
    constructor();
    protected getDefaultType(): string;
    protected getDefaultId(): string;
    private _endpoint;
    private _id;
    get type(): string;
    get id(): string;
    get endpoint(): string;
    get endpointParameters(): string;
    create(): JsonApiDataInterface;
}
