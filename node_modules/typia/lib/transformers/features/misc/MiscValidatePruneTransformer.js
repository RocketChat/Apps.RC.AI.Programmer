"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscValidatePruneTransformer = void 0;
var MiscValidatePruneProgrammer_1 = require("../../../programmers/misc/MiscValidatePruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscValidatePruneTransformer;
(function (MiscValidatePruneTransformer) {
    MiscValidatePruneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.validatPrune")(function (project) { return function (modulo) { return MiscValidatePruneProgrammer_1.MiscValidatePruneProgrammer.write(project)(modulo); }; });
})(MiscValidatePruneTransformer || (exports.MiscValidatePruneTransformer = MiscValidatePruneTransformer = {}));
//# sourceMappingURL=MiscValidatePruneTransformer.js.map