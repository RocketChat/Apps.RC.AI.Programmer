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
exports.JsonMetadataFactory = void 0;
var AtomicPredicator_1 = require("../programmers/helpers/AtomicPredicator");
var TransformerError_1 = require("../transformers/TransformerError");
var MetadataCollection_1 = require("./MetadataCollection");
var MetadataFactory_1 = require("./MetadataFactory");
var JsonMetadataFactory;
(function (JsonMetadataFactory) {
    JsonMetadataFactory.analyze = function (method) {
        return function (checker, context) {
            return function (type) {
                var collection = new MetadataCollection_1.MetadataCollection();
                var result = MetadataFactory_1.MetadataFactory.analyze(checker, context)({
                    escape: true,
                    constant: true,
                    absorb: true,
                    validate: JsonMetadataFactory.validate,
                })(collection)(type);
                if (result.success === false)
                    throw TransformerError_1.TransformerError.from(method)(result.errors);
                return [collection, result.data];
            };
        };
    };
    JsonMetadataFactory.validate = function (meta) {
        var e_1, _a;
        var output = [];
        if (meta.atomics.some(function (a) { return a.type === "bigint"; }) ||
            meta.constants.some(function (c) { return c.type === "bigint"; }))
            output.push("JSON does not support bigint type.");
        if (meta.tuples.some(function (t) {
            return t.type.elements.some(function (e) { return e.isRequired() === false; });
        }) ||
            meta.arrays.some(function (a) { return a.type.value.isRequired() === false; }))
            output.push("JSON does not support undefined type in array.");
        if (meta.maps.length)
            output.push("JSON does not support Map type.");
        if (meta.sets.length)
            output.push("JSON does not support Set type.");
        try {
            for (var _b = __values(meta.natives), _c = _b.next(); !_c.done; _c = _b.next()) {
                var native = _c.value;
                if (AtomicPredicator_1.AtomicPredicator.native(native) === false && native !== "Date")
                    output.push("JSON does not support ".concat(native, " type."));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return output;
    };
})(JsonMetadataFactory || (exports.JsonMetadataFactory = JsonMetadataFactory = {}));
//# sourceMappingURL=JsonMetadataFactory.js.map