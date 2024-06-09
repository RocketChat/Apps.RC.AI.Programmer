"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateValidateTransformer = void 0;
var ValidateProgrammer_1 = require("../../programmers/ValidateProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var CreateValidateTransformer;
(function (CreateValidateTransformer) {
    CreateValidateTransformer.transform = function (equals) {
        return GenericTransformer_1.GenericTransformer.factory(equals ? "createValidateEquals" : "createValidate")(function (project) { return function (modulo) {
            return ValidateProgrammer_1.ValidateProgrammer.write(project)(modulo)(equals);
        }; });
    };
})(CreateValidateTransformer || (exports.CreateValidateTransformer = CreateValidateTransformer = {}));
//# sourceMappingURL=CreateValidateTransformer.js.map