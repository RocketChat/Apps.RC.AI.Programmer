"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscPruneTransformer = void 0;
var MiscPruneProgrammer_1 = require("../../../programmers/misc/MiscPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscPruneTransformer;
(function (MiscPruneTransformer) {
    MiscPruneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.prune")(function (project) { return function (modulo) { return MiscPruneProgrammer_1.MiscPruneProgrammer.write(project)(modulo); }; });
})(MiscPruneTransformer || (exports.MiscPruneTransformer = MiscPruneTransformer = {}));
//# sourceMappingURL=MiscPruneTransformer.js.map