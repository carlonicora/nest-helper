export type JsonApiBuilderInterface = {
    get type(): string;
    get id(): string;
    get endpoint(): string;
    create(): any;
};
