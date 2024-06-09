"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateAssertPruneTransformer = void 0;
var MiscAssertPruneProgrammer_1 = require("../../../programmers/misc/MiscAssertPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateAssertPruneTransformer;
(function (MiscCreateAssertPruneTransformer) {
    MiscCreateAssertPruneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createAssertPrune")(function (project) { return function (modulo) { return MiscAssertPruneProgrammer_1.MiscAssertPruneProgrammer.write(project)(modulo); }; });
})(MiscCreateAssertPruneTransformer || (exports.MiscCreateAssertPruneTransformer = MiscCreateAssertPruneTransformer = {}));
//# sourceMappingURL=MiscCreateAssertPruneTransformer.js.map