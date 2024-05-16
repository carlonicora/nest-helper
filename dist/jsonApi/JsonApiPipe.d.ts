import { PipeTransform } from "@nestjs/common";
export declare class JsonApiPipe<T> implements PipeTransform {
    private readonly classType;
    constructor(classType: new (...args: any[]) => T);
    transform(value: any): Promise<T>;
    private _validate;
    private _extractErrors;
}
