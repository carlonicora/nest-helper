import { HttpException, HttpStatus } from "@nestjs/common";

export { Imgix } from "./imgix/Imgix";
export { JsonApiNavigator } from "./jsonApi/JsonApiNavigator";

export { AuthModule } from "./auth/auth.module";
export { JwtAuthGuard } from "./auth/jwt-auth.guard";
export { JwtStrategy } from "./auth/jwt.strategy";
export { OptionalJwtAuthGuard } from "./auth/optional-jwt-auth.guard";
export { JsonApiBuilder } from "./jsonApi/JsonApiBuilder";
export {
  JsonApiDataInterface,
  transformFunction,
} from "./jsonApi/interfaces/JsonApiDataInterface";
export { Router } from "./routing/Router";
export { DataValidator } from "./validator/DataValidator";

// Validates if the provided string is a valid UUID
function isValidUuid(uuid: string): boolean {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

// Converts UUID string to a Buffer, validates UUID before conversion
export function uuidToBuffer(uuid: string): Buffer {
  if (!isValidUuid(uuid)) {
    throw new HttpException("Invalid UUID format", HttpStatus.BAD_REQUEST);
  }
  const hex = uuid.replace(/-/g, "");
  return Buffer.from(hex, "hex");
}

// Converts Buffer back to UUID string
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

export { JsonApiPipe } from "./jsonApi/JsonApiPipe";
export { JsonApiBuilderInterface } from "./jsonApi/interfaces/JsonApiBuilderInterface";
