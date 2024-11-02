/// <reference types="node" />
export { Imgix } from "./imgix/Imgix";
export { JsonApiNavigator } from "./jsonApi/JsonApiNavigator";
export { AuthModule } from "./auth/auth.module";
export { JwtAuthGuard } from "./auth/jwt-auth.guard";
export { JwtStrategy } from "./auth/jwt.strategy";
export { OptionalJwtAuthGuard } from "./auth/optional-jwt-auth.guard";
export { JsonApiDataInterface, transformFunction, } from "./jsonApi/interfaces/JsonApiDataInterface";
export { Router } from "./routing/Router";
export { JsonApiBuilder } from "./serialisers/JsonApiBuilder";
export { DataValidator } from "./validator/DataValidator";
export declare function createSlug(title: string): string;
export declare function isValidUuid(uuid: string): boolean;
export declare function uuidToBuffer(uuid: string): Buffer;
export declare function bufferToUuid(buffer: Buffer): string;
export { JsonApiPipe } from "./jsonApi/JsonApiPipe";
export { AbstractJsonApiSerialiser } from "./serialisers/abstracts/AbstractJsonApiSerialiser";
export { JsonApiSerialiserOptions } from "./serialisers/decorators/JsonApiSerialiserOptions";
export { JsonApiBuilderInterface } from "./serialisers/interfaces/JsonApiBuilderInterface";
