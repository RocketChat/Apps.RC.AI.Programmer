"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTransformer = void 0;
var IsProgrammer_1 = require("../../programmers/IsProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var IsTransformer;
(function (IsTransformer) {
    IsTransformer.transform = function (equals) {
        return GenericTransformer_1.GenericTransformer.scalar(equals ? "equals" : "is")(function (project) { return function (modulo) { return IsProgrammer_1.IsProgrammer.write(project)(modulo)(equals); }; });
    };
})(IsTransformer || (exports.IsTransformer = IsTransformer = {}));
//# sourceMappingURL=IsTransformer.js.map