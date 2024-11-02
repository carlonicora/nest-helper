import { JsonApiDataInterface } from "../../jsonApi/interfaces/JsonApiDataInterface";
import { JsonApiBuilderInterface } from "../interfaces/JsonApiBuilderInterface";
export declare abstract class AbstractJsonApiSerialiser implements JsonApiBuilderInterface {
    private _endpoint;
    private _id;
    private _attributes;
    private _meta;
    private _links;
    private _relationships;
    constructor();
    private _getDefaultType;
    private _getDefaultId;
    get type(): string;
    get id(): string;
    get endpoint(): string;
    get endpointParameters(): string;
    set attributes(attributes: any);
    set meta(meta: any);
    set links(links: any);
    set relationships(relationships: any);
    create(): JsonApiDataInterface;
}
