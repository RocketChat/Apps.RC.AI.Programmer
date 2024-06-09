"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscIsCloneTransformer = void 0;
var MiscIsCloneProgrammer_1 = require("../../../programmers/misc/MiscIsCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscIsCloneTransformer;
(function (MiscIsCloneTransformer) {
    MiscIsCloneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.isClone")(function (project) { return function (modulo) { return MiscIsCloneProgrammer_1.MiscIsCloneProgrammer.write(project)(modulo); }; });
})(MiscIsCloneTransformer || (exports.MiscIsCloneTransformer = MiscIsCloneTransformer = {}));
//# sourceMappingURL=MiscIsCloneTransformer.js.map