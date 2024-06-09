"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_tuple = void 0;
var MetadataTuple_1 = require("../../../schemas/metadata/MetadataTuple");
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var emplace_metadata_tuple_1 = require("./emplace_metadata_tuple");
var iterate_metadata_tuple = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    if (!checker.isTupleType(type))
                        return false;
                    var tupleType = (0, emplace_metadata_tuple_1.emplace_metadata_tuple)(checker)(options)(collection)(errors)(type, meta.nullable, explore);
                    ArrayUtil_1.ArrayUtil.add(meta.tuples, MetadataTuple_1.MetadataTuple.create({
                        type: tupleType,
                        tags: [],
                    }), function (elem) { return elem.type.name === tupleType.name; });
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_tuple = iterate_metadata_tuple;
//# sourceMappingURL=iterate_metadata_tuple.js.map