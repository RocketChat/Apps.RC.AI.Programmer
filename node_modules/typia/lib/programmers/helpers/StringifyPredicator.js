"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringifyPredicator = void 0;
var StringifyPredicator;
(function (StringifyPredicator) {
    StringifyPredicator.require_escape = function (value) {
        return value.split("").some(function (ch) { return ESCAPED.some(function (escaped) { return escaped === ch; }); });
    };
    StringifyPredicator.undefindable = function (meta) {
        return meta.isRequired() === false ||
            (meta.escaped !== null && meta.escaped.returns.isRequired() === false);
    };
    var ESCAPED = ['"', "\\", "\b", "\f", "\n", "\n", "\r", "\t"];
})(StringifyPredicator || (exports.StringifyPredicator = StringifyPredicator = {}));
//# sourceMappingURL=StringifyPredicator.js.map