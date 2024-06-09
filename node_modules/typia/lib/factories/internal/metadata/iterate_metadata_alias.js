"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_alias = void 0;
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var emplace_metadata_alias_1 = require("./emplace_metadata_alias");
var iterate_metadata_alias = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    var _a;
                    if (options.absorb !== false || type.aliasSymbol === undefined)
                        return false;
                    var node = (_a = type.aliasSymbol.declarations) === null || _a === void 0 ? void 0 : _a[0];
                    if (node === undefined)
                        return false;
                    // CONSTRUCT DEFINITION
                    var alias = (0, emplace_metadata_alias_1.emplace_metadata_alias)(checker)(options)(collection)(errors)(type, meta.nullable, explore);
                    ArrayUtil_1.ArrayUtil.add(meta.aliases, alias, function (elem) { return elem.name === alias.name; });
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_alias = iterate_metadata_alias;
//# sourceMappingURL=iterate_metadata_alias.js.map