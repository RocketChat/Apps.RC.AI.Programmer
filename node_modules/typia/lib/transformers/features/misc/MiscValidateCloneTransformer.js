"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscValidateCloneTransformer = void 0;
var MiscValidateCloneProgrammer_1 = require("../../../programmers/misc/MiscValidateCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscValidateCloneTransformer;
(function (MiscValidateCloneTransformer) {
    MiscValidateCloneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.validatClone")(function (project) { return function (modulo) { return MiscValidateCloneProgrammer_1.MiscValidateCloneProgrammer.write(project)(modulo); }; });
})(MiscValidateCloneTransformer || (exports.MiscValidateCloneTransformer = MiscValidateCloneTransformer = {}));
//# sourceMappingURL=MiscValidateCloneTransformer.js.map