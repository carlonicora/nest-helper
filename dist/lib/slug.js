"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlug = createSlug;
function createSlug(title) {
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
//# sourceMappingURL=slug.js.map