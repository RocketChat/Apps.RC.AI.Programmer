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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emplace_metadata_alias = void 0;
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var explore_metadata_1 = require("./explore_metadata");
var emplace_metadata_alias = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (type, nullable, explore) {
                    // CHECK EXISTENCE
                    var _a = __read(collection.emplaceAlias(checker, type, type.aliasSymbol), 3), alias = _a[0], newbie = _a[1], closure = _a[2];
                    ArrayUtil_1.ArrayUtil.add(alias.nullables, nullable);
                    if (newbie === false)
                        return alias;
                    // CONSTRUCT VALUE TYPE
                    var value = (0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(type, __assign(__assign({}, explore), { escaped: false, aliased: true }));
                    closure(value);
                    return alias;
                };
            };
        };
    };
};
exports.emplace_metadata_alias = emplace_metadata_alias;
//# sourceMappingURL=emplace_metadata_alias.js.map