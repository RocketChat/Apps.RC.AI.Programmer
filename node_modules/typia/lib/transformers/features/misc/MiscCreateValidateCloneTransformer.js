"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateValidateCloneTransformer = void 0;
var MiscValidateCloneProgrammer_1 = require("../../../programmers/misc/MiscValidateCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateValidateCloneTransformer;
(function (MiscCreateValidateCloneTransformer) {
    MiscCreateValidateCloneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createValidateClone")(function (project) { return function (modulo) { return MiscValidateCloneProgrammer_1.MiscValidateCloneProgrammer.write(project)(modulo); }; });
})(MiscCreateValidateCloneTransformer || (exports.MiscCreateValidateCloneTransformer = MiscCreateValidateCloneTransformer = {}));
//# sourceMappingURL=MiscCreateValidateCloneTransformer.js.map