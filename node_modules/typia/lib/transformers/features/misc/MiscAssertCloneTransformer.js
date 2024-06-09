"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscAssertCloneTransformer = void 0;
var MiscAssertCloneProgrammer_1 = require("../../../programmers/misc/MiscAssertCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscAssertCloneTransformer;
(function (MiscAssertCloneTransformer) {
    MiscAssertCloneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.assertClone")(function (project) { return function (modulo) { return MiscAssertCloneProgrammer_1.MiscAssertCloneProgrammer.write(project)(modulo); }; });
})(MiscAssertCloneTransformer || (exports.MiscAssertCloneTransformer = MiscAssertCloneTransformer = {}));
//# sourceMappingURL=MiscAssertCloneTransformer.js.map