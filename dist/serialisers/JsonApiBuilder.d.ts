import { JsonApiDataInterface } from "../jsonApi/interfaces/JsonApiDataInterface";
import { JsonApiBuilderInterface } from "./interfaces/JsonApiBuilderInterface";
export interface JsonApiPaginationInterface {
    size?: number;
    before?: string;
    after?: string;
    idName?: string;
}
export interface JsonApiCursorInterface {
    cursor?: string;
    take?: number;
}
export interface JsonApiRelationshipBuilderInterface {
    type: string;
    id: string;
}
export declare class JsonApiBuilder {
    private _paginationCount;
    private _pagination;
    private _additionalParams;
    constructor(query?: any);
    private get size();
    buildSingle(builder: JsonApiBuilderInterface, record: any): Promise<any>;
    buildList(builder: JsonApiBuilderInterface, records: any[]): Promise<any>;
    generateCursor(): JsonApiCursorInterface;
    private updatePagination;
    private _addToIncluded;
    serialise<T, R extends JsonApiDataInterface>(data: T | T[], builder: R, url?: string, idName?: string): any;
    private serialiseData;
    private serialiseRelationship;
}
