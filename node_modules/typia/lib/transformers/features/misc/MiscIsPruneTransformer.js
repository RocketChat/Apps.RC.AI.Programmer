"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscIsPruneTransformer = void 0;
var MiscIsPruneProgrammer_1 = require("../../../programmers/misc/MiscIsPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscIsPruneTransformer;
(function (MiscIsPruneTransformer) {
    MiscIsPruneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.isPrune")(function (project) { return function (modulo) { return MiscIsPruneProgrammer_1.MiscIsPruneProgrammer.write(project)(modulo); }; });
})(MiscIsPruneTransformer || (exports.MiscIsPruneTransformer = MiscIsPruneTransformer = {}));
//# sourceMappingURL=MiscIsPruneTransformer.js.map