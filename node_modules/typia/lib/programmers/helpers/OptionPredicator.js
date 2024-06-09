"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionPredicator = void 0;
var OptionPredicator;
(function (OptionPredicator) {
    OptionPredicator.numeric = function (options) {
        return OptionPredicator.finite(options) || options.numeric === true;
    };
    OptionPredicator.functional = function (options) {
        return options.functional === true;
    };
    OptionPredicator.finite = function (options) {
        return options.finite === true;
    };
    OptionPredicator.undefined = function (options) {
        return options.undefined !== false;
    };
})(OptionPredicator || (exports.OptionPredicator = OptionPredicator = {}));
//# sourceMappingURL=OptionPredicator.js.map