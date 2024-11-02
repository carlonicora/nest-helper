import { HttpException, HttpStatus } from "@nestjs/common";

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
