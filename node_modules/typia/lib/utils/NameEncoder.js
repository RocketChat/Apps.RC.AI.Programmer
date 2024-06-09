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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameEncoder = void 0;
var NameEncoder;
(function (NameEncoder) {
    function encode(str) {
        var e_1, _a;
        try {
            for (var REPLACERS_1 = __values(REPLACERS), REPLACERS_1_1 = REPLACERS_1.next(); !REPLACERS_1_1.done; REPLACERS_1_1 = REPLACERS_1.next()) {
                var _b = __read(REPLACERS_1_1.value, 2), before = _b[0], after = _b[1];
                str = str.split(before).join(after);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (REPLACERS_1_1 && !REPLACERS_1_1.done && (_a = REPLACERS_1.return)) _a.call(REPLACERS_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return str;
    }
    NameEncoder.encode = encode;
    function decode(str) {
        var e_2, _a;
        try {
            for (var REPLACERS_2 = __values(REPLACERS), REPLACERS_2_1 = REPLACERS_2.next(); !REPLACERS_2_1.done; REPLACERS_2_1 = REPLACERS_2.next()) {
                var _b = __read(REPLACERS_2_1.value, 2), before = _b[0], after = _b[1];
                if (after !== "")
                    str = str.split(after).join(before);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (REPLACERS_2_1 && !REPLACERS_2_1.done && (_a = REPLACERS_2.return)) _a.call(REPLACERS_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return str;
    }
    NameEncoder.decode = decode;
})(NameEncoder || (exports.NameEncoder = NameEncoder = {}));
var REPLACERS = [
    ["$", "_dollar_"],
    ["&", "_and_"],
    ["|", "_or_"],
    ["{", "_blt_"],
    ["}", "_bgt_"],
    ["<", "_lt_"],
    [">", "_gt_"],
    ["(", "_lp_"],
    [")", "_rp_"],
    ["[", "_alt_"],
    ["]", "_agt_"],
    [",", "_comma_"],
    ["`", "_backquote_"],
    ["'", "_singlequote_"],
    ['"', "_doublequote_"],
    [" ", "_space_"],
];
//# sourceMappingURL=NameEncoder.js.map