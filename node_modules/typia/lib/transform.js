"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
var typescript_1 = __importDefault(require("typescript"));
var FileTransformer_1 = require("./transformers/FileTransformer");
var transform = function (program, options, extras) {
    var compilerOptions = program.getCompilerOptions();
    var strict = compilerOptions.strictNullChecks !== undefined
        ? !!compilerOptions.strictNullChecks
        : !!compilerOptions.strict;
    if (strict === false)
        extras.addDiagnostic({
            category: typescript_1.default.DiagnosticCategory.Error,
            code: "(typia)",
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "strict mode is required.",
        });
    return FileTransformer_1.FileTransformer.transform({
        program: program,
        compilerOptions: compilerOptions,
        checker: program.getTypeChecker(),
        printer: typescript_1.default.createPrinter(),
        options: options !== null && options !== void 0 ? options : {},
        extras: extras,
    });
};
exports.transform = transform;
exports.default = exports.transform;
//# sourceMappingURL=transform.js.map