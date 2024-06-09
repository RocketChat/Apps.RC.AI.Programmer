"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCreateIsPruneTransformer = void 0;
var MiscIsPruneProgrammer_1 = require("../../../programmers/misc/MiscIsPruneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCreateIsPruneTransformer;
(function (MiscCreateIsPruneTransformer) {
    MiscCreateIsPruneTransformer.transform = GenericTransformer_1.GenericTransformer.factory("misc.createIsPrune")(function (project) { return function (modulo) { return MiscIsPruneProgrammer_1.MiscIsPruneProgrammer.write(project)(modulo); }; });
})(MiscCreateIsPruneTransformer || (exports.MiscCreateIsPruneTransformer = MiscCreateIsPruneTransformer = {}));
//# sourceMappingURL=MiscCreateIsPruneTransformer.js.map