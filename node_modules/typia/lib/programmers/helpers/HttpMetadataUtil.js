"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMetadataUtil = void 0;
var HttpMetadataUtil;
(function (HttpMetadataUtil) {
    HttpMetadataUtil.atomics = function (meta) {
        return new Set(__spreadArray(__spreadArray(__spreadArray([], __read(meta.atomics.map(function (a) { return a.type; })), false), __read(meta.constants.map(function (c) { return c.type; })), false), __read((meta.templates.length ? ["string"] : [])), false));
    };
    HttpMetadataUtil.isUnion = function (meta) {
        return HttpMetadataUtil.atomics(meta).size +
            meta.arrays.length +
            meta.tuples.length +
            meta.natives.length +
            meta.maps.length +
            meta.objects.length >
            1;
    };
})(HttpMetadataUtil || (exports.HttpMetadataUtil = HttpMetadataUtil = {}));
//# sourceMappingURL=HttpMetadataUtil.js.map