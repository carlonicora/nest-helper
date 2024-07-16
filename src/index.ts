import { HttpException, HttpStatus } from "@nestjs/common";

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
export { JsonApiBuilder } from "./jsonApi/JsonApiBuilder";
export { Router } from "./routing/Router";
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

export function isValidUuid(uuid: string): boolean {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

export function uuidToBuffer(uuid: string): Buffer {
  if (!isValidUuid(uuid)) {
    throw new HttpException("Invalid UUID format", HttpStatus.BAD_REQUEST);
  }
  const hex = uuid.replace(/-/g, "");
  return Buffer.from(hex, "hex");
}

export function bufferToUuid(buffer: Buffer): string {
  const hex = buffer.toString("hex");
  const uuid = [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32),
  ].join("-");
  if (!isValidUuid(uuid)) {
    throw new HttpException(
      "Invalid UUID format",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  return uuid;
}

export { JsonApiBuilderInterface } from "./jsonApi/interfaces/JsonApiBuilderInterface";
export { JsonApiPipe } from "./jsonApi/JsonApiPipe";
