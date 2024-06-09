"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationAssertGeneralTransformer = void 0;
var NotationAssertGeneralProgrammer_1 = require("../../../programmers/notations/NotationAssertGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationAssertGeneralTransformer;
(function (NotationAssertGeneralTransformer) {
    NotationAssertGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.scalar("notations.assert".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationAssertGeneralProgrammer_1.NotationAssertGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationAssertGeneralTransformer || (exports.NotationAssertGeneralTransformer = NotationAssertGeneralTransformer = {}));
//# sourceMappingURL=NotationAssertGeneralTransformer.js.map