"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationCreateGeneralTransformer = void 0;
var NotationGeneralProgrammer_1 = require("../../../programmers/notations/NotationGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationCreateGeneralTransformer;
(function (NotationCreateGeneralTransformer) {
    NotationCreateGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.factory("notations.create".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationGeneralProgrammer_1.NotationGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationCreateGeneralTransformer || (exports.NotationCreateGeneralTransformer = NotationCreateGeneralTransformer = {}));
//# sourceMappingURL=NotationCreateGeneralTransformer.js.map