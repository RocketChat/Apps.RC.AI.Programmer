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
exports.MetadataArray = void 0;
var MetadataArray = /** @class */ (function () {
    /**
     * @hidden
     */
    function MetadataArray(props) {
        this.type = props.type;
        this.tags = props.tags;
    }
    MetadataArray.create = function (props) {
        return new MetadataArray(props);
    };
    MetadataArray.prototype.getName = function () {
        var _this = this;
        var _a;
        return ((_a = this.name_) !== null && _a !== void 0 ? _a : (this.name_ = (function () {
            if (_this.tags.length === 0)
                return _this.type.name;
            else if (_this.tags.length === 1) {
                var str = __spreadArray([
                    _this.type.name
                ], __read(_this.tags[0].map(function (t) { return t.name; })), false).join(" & ");
                return "(".concat(str, ")");
            }
            var rows = _this.tags.map(function (row) {
                var str = row.map(function (t) { return t.name; }).join(" & ");
                return row.length === 1 ? str : "(".concat(str, ")");
            });
            return "(".concat(_this.type.name, " & (").concat(rows.join(" | "), "))");
        })()));
    };
    MetadataArray.prototype.toJSON = function () {
        return {
            type: this.type.toJSON(),
            tags: this.tags.map(function (row) { return row.slice(); }),
        };
    };
    return MetadataArray;
}());
exports.MetadataArray = MetadataArray;
//# sourceMappingURL=MetadataArray.js.map