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
exports.MetadataComponents = void 0;
var Writable_1 = require("../../typings/Writable");
var Metadata_1 = require("./Metadata");
var MetadataAlias_1 = require("./MetadataAlias");
var MetadataArrayType_1 = require("./MetadataArrayType");
var MetadataObject_1 = require("./MetadataObject");
var MetadataProperty_1 = require("./MetadataProperty");
var MetadataTupleType_1 = require("./MetadataTupleType");
var MetadataComponents = /** @class */ (function () {
    function MetadataComponents(props) {
        this.aliases = props.aliases;
        this.objects = props.objects;
        this.arrays = props.arrays;
        this.tuples = props.tuples;
        this.dictionary = props.dictionary;
    }
    MetadataComponents.from = function (json) {
        var e_1, _a, _b, e_2, _c, e_3, _d, e_4, _e;
        // INITIALIZE COMPONENTS
        var dictionary = {
            objects: new Map(json.objects.map(function (obj) { return [
                obj.name,
                MetadataObject_1.MetadataObject._From_without_properties(obj),
            ]; })),
            aliases: new Map(json.aliases.map(function (alias) { return [
                alias.name,
                MetadataAlias_1.MetadataAlias._From_without_value(alias),
            ]; })),
            arrays: new Map(json.arrays.map(function (arr) { return [
                arr.name,
                MetadataArrayType_1.MetadataArrayType._From_without_value(arr),
            ]; })),
            tuples: new Map(json.tuples.map(function (tpl) { return [
                tpl.name,
                MetadataTupleType_1.MetadataTupleType._From_without_elements(tpl),
            ]; })),
        };
        try {
            // CONSTRUCT METADATA OF THEM
            for (var _f = __values(json.objects), _g = _f.next(); !_g.done; _g = _f.next()) {
                var obj = _g.value;
                (_b = dictionary.objects
                    .get(obj.name)
                    .properties).push.apply(_b, __spreadArray([], __read(obj.properties.map(function (prop) {
                    return MetadataProperty_1.MetadataProperty.from(prop, dictionary);
                })), false));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _h = __values(json.aliases), _j = _h.next(); !_j.done; _j = _h.next()) {
                var alias = _j.value;
                (0, Writable_1.Writable)(dictionary.aliases.get(alias.name)).value = Metadata_1.Metadata.from(alias.value, dictionary);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _k = __values(json.arrays), _l = _k.next(); !_l.done; _l = _k.next()) {
                var array = _l.value;
                (0, Writable_1.Writable)(dictionary.arrays.get(array.name)).value = Metadata_1.Metadata.from(array.value, dictionary);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_l && !_l.done && (_d = _k.return)) _d.call(_k);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _m = __values(json.tuples), _o = _m.next(); !_o.done; _o = _m.next()) {
                var tuple = _o.value;
                (0, Writable_1.Writable)(dictionary.tuples.get(tuple.name)).elements =
                    tuple.elements.map(function (elem) { return Metadata_1.Metadata.from(elem, dictionary); });
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_e = _m.return)) _e.call(_m);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // FINALIZE
        return new MetadataComponents({
            aliases: __spreadArray([], __read(dictionary.aliases.values()), false),
            objects: __spreadArray([], __read(dictionary.objects.values()), false),
            arrays: __spreadArray([], __read(dictionary.arrays.values()), false),
            tuples: __spreadArray([], __read(dictionary.tuples.values()), false),
            dictionary: dictionary,
        });
    };
    MetadataComponents.prototype.toJSON = function () {
        return {
            aliases: this.aliases.map(function (alias) { return alias.toJSON(); }),
            objects: this.objects.map(function (object) { return object.toJSON(); }),
            arrays: this.arrays.map(function (array) { return array.toJSON(); }),
            tuples: this.tuples.map(function (tuple) { return tuple.toJSON(); }),
        };
    };
    return MetadataComponents;
}());
exports.MetadataComponents = MetadataComponents;
//# sourceMappingURL=MetadataComponents.js.map