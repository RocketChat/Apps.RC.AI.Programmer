"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIsTransformer = void 0;
var IsProgrammer_1 = require("../../programmers/IsProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var CreateIsTransformer;
(function (CreateIsTransformer) {
    CreateIsTransformer.transform = function (equals) {
        return GenericTransformer_1.GenericTransformer.factory(equals ? "createEquals" : "createIs")(function (project) { return function (modulo) { return IsProgrammer_1.IsProgrammer.write(project)(modulo)(equals); }; });
    };
})(CreateIsTransformer || (exports.CreateIsTransformer = CreateIsTransformer = {}));
//# sourceMappingURL=CreateIsTransformer.js.map