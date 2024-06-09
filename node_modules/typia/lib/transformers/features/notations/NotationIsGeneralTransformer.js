"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationIsGeneralTransformer = void 0;
var NotationIsGeneralProgrammer_1 = require("../../../programmers/notations/NotationIsGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationIsGeneralTransformer;
(function (NotationIsGeneralTransformer) {
    NotationIsGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.scalar("notations.is".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationIsGeneralProgrammer_1.NotationIsGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationIsGeneralTransformer || (exports.NotationIsGeneralTransformer = NotationIsGeneralTransformer = {}));
//# sourceMappingURL=NotationIsGeneralTransformer.js.map