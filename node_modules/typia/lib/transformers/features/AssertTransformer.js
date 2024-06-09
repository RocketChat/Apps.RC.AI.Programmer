"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertTransformer = void 0;
var AssertProgrammer_1 = require("../../programmers/AssertProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var AssertTransformer;
(function (AssertTransformer) {
    AssertTransformer.transform = function (props) {
        return GenericTransformer_1.GenericTransformer.scalar(props.equals
            ? props.guard
                ? "assertGuardEquals"
                : "assertEquals"
            : props.guard
                ? "assertGuard"
                : "assert")(function (project) { return function (modulo) { return AssertProgrammer_1.AssertProgrammer.write(project)(modulo)(props); }; });
    };
})(AssertTransformer || (exports.AssertTransformer = AssertTransformer = {}));
//# sourceMappingURL=AssertTransformer.js.map