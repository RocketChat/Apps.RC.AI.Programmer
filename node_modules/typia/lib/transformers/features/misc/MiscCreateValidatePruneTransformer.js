"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateValidatePruneTransformer = void 0;
var MiscValidatePruneProgrammer_1 = require("../../../programmers/misc/MiscValidatePruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateValidatePruneTransformer;
(function (MiscCreateValidatePruneTransformer) {
    MiscCreateValidatePruneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createValidatePrune")(function (project) { return function (modulo) { return MiscValidatePruneProgrammer_1.MiscValidatePruneProgrammer.write(project)(modulo); }; });
})(MiscCreateValidatePruneTransformer || (exports.MiscCreateValidatePruneTransformer = MiscCreateValidatePruneTransformer = {}));
//# sourceMappingURL=MiscCreateValidatePruneTransformer.js.map