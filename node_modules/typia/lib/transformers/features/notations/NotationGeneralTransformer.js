"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationGeneralTransformer = void 0;
var NotationGeneralProgrammer_1 = require("../../../programmers/notations/NotationGeneralProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationGeneralTransformer;
(function (NotationGeneralTransformer) {
    NotationGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.scalar("notations.".concat(rename.name))(function (project) { return function (modulo) {
            return NotationGeneralProgrammer_1.NotationGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationGeneralTransformer || (exports.NotationGeneralTransformer = NotationGeneralTransformer = {}));
//# sourceMappingURL=NotationGeneralTransformer.js.map