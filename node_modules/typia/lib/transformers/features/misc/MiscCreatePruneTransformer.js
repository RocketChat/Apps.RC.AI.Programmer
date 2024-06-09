"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreatePruneTransformer = void 0;
var MiscPruneProgrammer_1 = require("../../../programmers/misc/MiscPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreatePruneTransformer;
(function (MiscCreatePruneTransformer) {
    MiscCreatePruneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createPrune")(function (project) { return function (modulo) { return MiscPruneProgrammer_1.MiscPruneProgrammer.write(project)(modulo); }; });
})(MiscCreatePruneTransformer || (exports.MiscCreatePruneTransformer = MiscCreatePruneTransformer = {}));
//# sourceMappingURL=MiscCreatePruneTransformer.js.map