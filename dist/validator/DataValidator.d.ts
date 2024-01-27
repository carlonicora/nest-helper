export declare class DataValidator {
    static validateAndTransformDto<T extends object>(dtoClass: new () => T, data: any): Promise<T>;
    private static _formatErrors;
}
