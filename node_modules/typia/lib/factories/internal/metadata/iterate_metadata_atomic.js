"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_atomic = void 0;
var typescript_1 = __importDefault(require("typescript"));
var MetadataAtomic_1 = require("../../../schemas/metadata/MetadataAtomic");
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var same = function (type) {
    if (type === null)
        return function () { return false; };
    return function (flag) { return (type.getFlags() & flag) !== 0; };
};
var iterate_metadata_atomic = function (meta, type) {
    // PREPARE INTERNAL FUNCTIONS
    var filter = same(type);
    var check = function (info) {
        if (filter(info.atomic) || filter(info.literal)) {
            ArrayUtil_1.ArrayUtil.add(meta.atomics, MetadataAtomic_1.MetadataAtomic.create({ type: info.name, tags: [] }), function (x, y) { return x.type === y.type; });
            return true;
        }
        return false;
    };
    // CHECK EACH TYPES
    return ATOMICS.some(function (info) { return check(info); });
};
exports.iterate_metadata_atomic = iterate_metadata_atomic;
var ATOMICS = [
    {
        name: "boolean",
        atomic: typescript_1.default.TypeFlags.BooleanLike,
        literal: typescript_1.default.TypeFlags.BooleanLiteral,
    },
    {
        name: "number",
        atomic: typescript_1.default.TypeFlags.NumberLike,
        literal: typescript_1.default.TypeFlags.NumberLiteral,
    },
    {
        name: "bigint",
        atomic: typescript_1.default.TypeFlags.BigInt,
        literal: typescript_1.default.TypeFlags.BigIntLiteral,
    },
    {
        name: "string",
        atomic: typescript_1.default.TypeFlags.StringLike,
        literal: typescript_1.default.TypeFlags.StringLiteral,
    },
];
//# sourceMappingURL=iterate_metadata_atomic.js.map