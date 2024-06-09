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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emplace_metadata_tuple = void 0;
var typescript_1 = __importDefault(require("typescript"));
var Metadata_1 = require("../../../schemas/metadata/Metadata");
var Writable_1 = require("../../../typings/Writable");
var ArrayUtil_1 = require("../../../utils/ArrayUtil");
var explore_metadata_1 = require("./explore_metadata");
var emplace_metadata_tuple = function (checker) {
    return function (options) {
        return function (collection) {
            return function (errors) {
                return function (type, nullable, explore) {
                    var _a, _b, _c;
                    // CHECK EXISTENCE
                    var _d = __read(collection.emplaceTuple(checker, type), 3), tuple = _d[0], newbie = _d[1], closure = _d[2];
                    ArrayUtil_1.ArrayUtil.add(tuple.nullables, nullable);
                    if (newbie === false)
                        return tuple;
                    // CONSTRUCT ELEMENT TYPES
                    var flagList = (_c = (_a = type.elementFlags) !== null && _a !== void 0 ? _a : (_b = type.target) === null || _b === void 0 ? void 0 : _b.elementFlags) !== null && _c !== void 0 ? _c : [];
                    var elements = checker
                        .getTypeArguments(type)
                        .map(function (elem, i) {
                        var child = (0, explore_metadata_1.explore_metadata)(checker)(options)(collection)(errors)(elem, __assign(__assign({}, explore), { nested: tuple, aliased: false, escaped: false }));
                        // CHECK OPTIONAL
                        var flag = flagList[i];
                        if (flag === typescript_1.default.ElementFlags.Optional)
                            (0, Writable_1.Writable)(child).optional = true;
                        // REST TYPE
                        if (flag !== typescript_1.default.ElementFlags.Rest)
                            return child;
                        var wrapper = Metadata_1.Metadata.initialize();
                        (0, Writable_1.Writable)(wrapper).rest = child;
                        return wrapper;
                    });
                    closure(elements);
                    return tuple;
                };
            };
        };
    };
};
exports.emplace_metadata_tuple = emplace_metadata_tuple;
//# sourceMappingURL=emplace_metadata_tuple.js.map