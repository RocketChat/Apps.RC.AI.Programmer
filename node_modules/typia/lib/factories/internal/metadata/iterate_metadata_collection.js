"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate_metadata_collection = void 0;
var iterate_metadata_comment_tags_1 = require("./iterate_metadata_comment_tags");
var iterate_metadata_collection = function (errors) {
    return function (collection) {
        var e_1, _a, e_2, _b, e_3, _c;
        try {
            for (var _d = __values(collection.arrays()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var array = _e.value;
                if (array.recursive === null)
                    collection.setArrayRecursive(array, isArrayRecursive(new Set())(array)(array.value));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _f = __values(collection.tuples()), _g = _f.next(); !_g.done; _g = _f.next()) {
                var tuple = _g.value;
                if (tuple.recursive === null) {
                    var visited = new Set();
                    collection.setTupleRecursive(tuple, tuple.elements.some(isTupleRecursive(visited)(tuple)));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var _loop_1 = function (obj) {
            (0, iterate_metadata_comment_tags_1.iterate_metadata_comment_tags)(errors)(obj);
            if (obj.recursive === null) {
                var visited_1 = new Set();
                collection.setObjectRecursive(obj, obj.properties.some(function (p) { return isObjectRecursive(visited_1)(obj)(p.value); }));
            }
        };
        try {
            for (var _h = __values(collection.objects()), _j = _h.next(); !_j.done; _j = _h.next()) {
                var obj = _j.value;
                _loop_1(obj);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
};
exports.iterate_metadata_collection = iterate_metadata_collection;
var isArrayRecursive = function (visited) {
    return function (array) {
        return function (meta) {
            if (visited.has(meta))
                return false;
            visited.add(meta);
            return (meta.arrays.some(function (a) {
                return a.type === array || isArrayRecursive(visited)(array)(a.type.value);
            }) ||
                meta.aliases.some(function (alias) {
                    return isArrayRecursive(visited)(array)(alias.value);
                }) ||
                meta.tuples.some(function (t) {
                    return !t.type.recursive &&
                        t.type.elements.some(function (e) { return isArrayRecursive(visited)(array)(e); });
                }) ||
                meta.maps.some(function (m) { return isArrayRecursive(visited)(array)(m.value); }) ||
                meta.sets.some(function (s) { return isArrayRecursive(visited)(array)(s); }) ||
                (meta.escaped !== null &&
                    isArrayRecursive(visited)(array)(meta.escaped.returns)) ||
                (meta.rest !== null && isArrayRecursive(visited)(array)(meta.rest)));
        };
    };
};
var isTupleRecursive = function (visited) {
    return function (tuple) {
        return function (meta) {
            if (visited.has(meta))
                return false;
            visited.add(meta);
            return (meta.tuples.some(function (t) {
                return t.type === tuple ||
                    t.type.elements.some(function (e) { return isTupleRecursive(visited)(tuple)(e); });
            }) ||
                meta.arrays.some(function (a) {
                    return !a.type.recursive && isTupleRecursive(visited)(tuple)(a.type.value);
                }) ||
                meta.maps.some(function (m) { return isTupleRecursive(visited)(tuple)(m.value); }) ||
                meta.sets.some(function (s) { return isTupleRecursive(visited)(tuple)(s); }) ||
                meta.aliases.some(function (alias) {
                    return isTupleRecursive(visited)(tuple)(alias.value);
                }) ||
                (meta.escaped !== null &&
                    isTupleRecursive(visited)(tuple)(meta.escaped.returns)) ||
                (meta.rest !== null && isTupleRecursive(visited)(tuple)(meta.rest)));
        };
    };
};
var isObjectRecursive = function (visited) {
    return function (obj) {
        return function (meta) {
            if (visited.has(meta))
                return false;
            visited.add(meta);
            return (meta.objects.some(function (o) {
                return obj === o ||
                    o.properties.some(function (prop) {
                        return isObjectRecursive(visited)(obj)(prop.value);
                    });
            }) ||
                meta.aliases.some(function (alias) {
                    return isObjectRecursive(visited)(obj)(alias.value);
                }) ||
                meta.arrays.some(function (array) {
                    return !array.type.recursive &&
                        isObjectRecursive(visited)(obj)(array.type.value);
                }) ||
                meta.tuples.some(function (tuple) {
                    return !tuple.type.recursive &&
                        tuple.type.elements.some(function (elem) {
                            return isObjectRecursive(visited)(obj)(elem);
                        });
                }) ||
                meta.maps.some(function (map) { return isObjectRecursive(visited)(obj)(map.value); }) ||
                meta.sets.some(function (value) { return isObjectRecursive(visited)(obj)(value); }) ||
                (meta.escaped !== null &&
                    isObjectRecursive(visited)(obj)(meta.escaped.returns)) ||
                (meta.rest !== null && isObjectRecursive(visited)(obj)(meta.rest)));
        };
    };
};
//# sourceMappingURL=iterate_metadata_collection.js.map