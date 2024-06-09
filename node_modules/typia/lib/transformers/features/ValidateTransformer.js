"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTransformer = void 0;
var ValidateProgrammer_1 = require("../../programmers/ValidateProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var ValidateTransformer;
(function (ValidateTransformer) {
    ValidateTransformer.transform = function (equals) {
        return GenericTransformer_1.GenericTransformer.scalar(equals ? "validateEquals" : "validate")(function (project) { return function (modulo) {
            return ValidateProgrammer_1.ValidateProgrammer.write(project)(modulo)(equals);
        }; });
    };
})(ValidateTransformer || (exports.ValidateTransformer = ValidateTransformer = {}));
//# sourceMappingURL=ValidateTransformer.js.map