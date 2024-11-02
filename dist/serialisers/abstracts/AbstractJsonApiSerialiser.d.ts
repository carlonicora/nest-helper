import { JsonApiDataInterface } from "../../jsonApi/interfaces/JsonApiDataInterface";
import { JsonApiBuilderInterface } from "../interfaces/JsonApiBuilderInterface";
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
