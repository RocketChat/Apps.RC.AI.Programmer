"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateIsCloneTransformer = void 0;
var MiscIsCloneProgrammer_1 = require("../../../programmers/misc/MiscIsCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateIsCloneTransformer;
(function (MiscCreateIsCloneTransformer) {
    MiscCreateIsCloneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createIsClone")(function (project) { return function (modulo) { return MiscIsCloneProgrammer_1.MiscIsCloneProgrammer.write(project)(modulo); }; });
})(MiscCreateIsCloneTransformer || (exports.MiscCreateIsCloneTransformer = MiscCreateIsCloneTransformer = {}));
//# sourceMappingURL=MiscCreateIsCloneTransformer.js.map