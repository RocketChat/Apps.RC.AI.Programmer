"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateAssertCloneTransformer = void 0;
var MiscAssertCloneProgrammer_1 = require("../../../programmers/misc/MiscAssertCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateAssertCloneTransformer;
(function (MiscCreateAssertCloneTransformer) {
    MiscCreateAssertCloneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createAssertClone")(function (project) { return function (modulo) { return MiscAssertCloneProgrammer_1.MiscAssertCloneProgrammer.write(project)(modulo); }; });
})(MiscCreateAssertCloneTransformer || (exports.MiscCreateAssertCloneTransformer = MiscCreateAssertCloneTransformer = {}));
//# sourceMappingURL=MiscCreateAssertCloneTransformer.js.map