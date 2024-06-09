"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationCreateIsGeneralTransformer = void 0;
var NotationIsGeneralProgrammer_1 = require("../../../programmers/notations/NotationIsGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationCreateIsGeneralTransformer;
(function (NotationCreateIsGeneralTransformer) {
    NotationCreateIsGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.factory("notations.createIs".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationIsGeneralProgrammer_1.NotationIsGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationCreateIsGeneralTransformer || (exports.NotationCreateIsGeneralTransformer = NotationCreateIsGeneralTransformer = {}));
//# sourceMappingURL=NotationCreateIsGeneralTransformer.js.map