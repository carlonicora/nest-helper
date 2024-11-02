export { Imgix } from "./imgix/Imgix";
export { JsonApiNavigator } from "./jsonApi/JsonApiNavigator";

export { AuthModule } from "./auth/auth.module";
export { JwtAuthGuard } from "./auth/jwt-auth.guard";
export { JwtStrategy } from "./auth/jwt.strategy";
export { OptionalJwtAuthGuard } from "./auth/optional-jwt-auth.guard";
export {
  JsonApiDataInterface,
  transformFunction,
} from "./jsonApi/interfaces/JsonApiDataInterface";
export { Router } from "./routing/Router";
export { JsonApiBuilder } from "./serialisers/JsonApiBuilder";
export { DataValidator } from "./validator/DataValidator";

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 75);
}

export { JsonApiPipe } from "./jsonApi/JsonApiPipe";
export { bufferToUuid, isValidUuid, uuidToBuffer } from "./lib/uuid";
export { AbstractJsonApiSerialiser } from "./serialisers/abstracts/AbstractJsonApiSerialiser";
export { JsonApiSerialiserOptions } from "./serialisers/decorators/JsonApiSerialiserOptions";
export { JsonApiBuilderInterface } from "./serialisers/interfaces/JsonApiBuilderInterface";
