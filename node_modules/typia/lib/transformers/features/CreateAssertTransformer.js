"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAssertTransformer = void 0;
var AssertProgrammer_1 = require("../../programmers/AssertProgrammer");
var GenericTransformer_1 = require("../internal/GenericTransformer");
var CreateAssertTransformer;
(function (CreateAssertTransformer) {
    CreateAssertTransformer.transform = function (props) {
        return GenericTransformer_1.GenericTransformer.factory(props.equals
            ? props.guard
                ? "createAssertGuardEquals"
                : "createAssertEquals"
            : props.guard
                ? "createAssertGuard"
                : "createAssert")(function (project) { return function (modulo) { return AssertProgrammer_1.AssertProgrammer.write(project)(modulo)(props); }; });
    };
})(CreateAssertTransformer || (exports.CreateAssertTransformer = CreateAssertTransformer = {}));
//# sourceMappingURL=CreateAssertTransformer.js.map