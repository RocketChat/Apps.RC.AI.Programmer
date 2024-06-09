"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_set = void 0;
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var TypeFactory_1 = require("../../TypeFactory");
var explore_metadata_1 = require("./explore_metadata");
var iterate_metadata_set = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    type = checker.getApparentType(type);
                    var name = TypeFactory_1.TypeFactory.getFullName(checker)(type, type.getSymbol());
                    var generic = type.aliasSymbol
                        ? type.aliasTypeArguments
                        : checker.getTypeArguments(type);
                    if (name.substring(0, 4) !== "Set<" || (generic === null || generic === void 0 ? void 0 : generic.length) !== 1)
                        return false;
                    var key = generic[0];
                    ArrayUtil_1.ArrayUtil.set(meta.sets, (0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(key, __assign(__assign({}, explore), { escaped: false, aliased: false })), function (elem) { return elem.getName(); });
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_set = iterate_metadata_set;
//# sourceMappingURL=iterate_metadata_set.js.map