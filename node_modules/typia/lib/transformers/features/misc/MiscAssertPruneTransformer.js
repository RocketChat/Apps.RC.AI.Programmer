"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscAssertPruneTransformer = void 0;
var MiscAssertPruneProgrammer_1 = require("../../../programmers/misc/MiscAssertPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscAssertPruneTransformer;
(function (MiscAssertPruneTransformer) {
    MiscAssertPruneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.assertPrune")(function (project) { return function (modulo) { return MiscAssertPruneProgrammer_1.MiscAssertPruneProgrammer.write(project)(modulo); }; });
})(MiscAssertPruneTransformer || (exports.MiscAssertPruneTransformer = MiscAssertPruneTransformer = {}));
//# sourceMappingURL=MiscAssertPruneTransformer.js.map