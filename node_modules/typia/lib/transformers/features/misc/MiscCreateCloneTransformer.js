"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateCloneTransformer = void 0;
var MiscCloneProgrammer_1 = require("../../../programmers/misc/MiscCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateCloneTransformer;
(function (MiscCreateCloneTransformer) {
    MiscCreateCloneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createClone")(function (project) { return function (modulo) { return MiscCloneProgrammer_1.MiscCloneProgrammer.write(project)(modulo); }; });
})(MiscCreateCloneTransformer || (exports.MiscCreateCloneTransformer = MiscCreateCloneTransformer = {}));
//# sourceMappingURL=MiscCreateCloneTransformer.js.map