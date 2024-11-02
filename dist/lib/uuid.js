"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToUuid = exports.uuidToBuffer = exports.isValidUuid = void 0;
const common_1 = require("@nestjs/common");
function isValidUuid(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}
exports.isValidUuid = isValidUuid;
function uuidToBuffer(uuid) {
    if (!isValidUuid(uuid)) {
        throw new common_1.HttpException("Invalid UUID format", common_1.HttpStatus.BAD_REQUEST);
    }
    const hex = uuid.replace(/-/g, "");
    return Buffer.from(hex, "hex");
}
exports.uuidToBuffer = uuidToBuffer;
function bufferToUuid(buffer) {
    const hex = buffer.toString("hex");
    const uuid = [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20, 32),
    ].join("-");
    if (!isValidUuid(uuid)) {
        throw new common_1.HttpException("Invalid UUID format", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return uuid;
}
exports.bufferToUuid = bufferToUuid;
//# sourceMappingURL=uuid.js.map