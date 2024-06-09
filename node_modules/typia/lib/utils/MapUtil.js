"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapUtil = void 0;
var MapUtil;
(function (MapUtil) {
    MapUtil.take = function (dict) {
        return function (key, generator) {
            var oldbie = dict.get(key);
            if (oldbie)
                return oldbie;
            var value = generator();
            dict.set(key, value);
            return value;
        };
    };
})(MapUtil || (exports.MapUtil = MapUtil = {}));
//# sourceMappingURL=MapUtil.js.map