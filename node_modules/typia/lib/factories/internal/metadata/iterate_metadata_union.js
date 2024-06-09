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
exports.iterate_metadata_union = void 0;
var iterate_metadata_1 = require("./iterate_metadata");
var iterate_metadata_union = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (meta, type, explore) {
                    if (!type.isUnion())
                        return false;
                    type.types.forEach(function (t) {
                        return (0, iterate_metadata_1.iterate_metadata)(checker)(options)(collection)(errors)(meta, t, __assign(__assign({}, explore), { aliased: false }));
                    });
                    return true;
                };
            };
        };
    };
};
exports.iterate_metadata_union = iterate_metadata_union;
//# sourceMappingURL=iterate_metadata_union.js.map