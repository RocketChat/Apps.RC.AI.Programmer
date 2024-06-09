"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var Singleton_1 = require("../utils/Singleton");
var NodeTransformer_1 = require("./NodeTransformer");
var FileTransformer;
(function (FileTransformer) {
    FileTransformer.transform = function (environments) {
        return function (context) {
            return function (file) {
                if (file.isDeclarationFile)
                    return file;
                var project = __assign(__assign({}, environments), { context: context });
                checkJsDocParsingMode.get(project, file);
                return typescript_1.default.visitEachChild(file, function (node) { return iterate_node(project)(node); }, context);
            };
        };
    };
    var iterate_node = function (project) {
        return function (node) {
            var _a;
            return typescript_1.default.visitEachChild((_a = try_transform_node(project)(node)) !== null && _a !== void 0 ? _a : node, function (child) { return iterate_node(project)(child); }, project.context);
        };
    };
    var try_transform_node = function (project) {
        return function (node) {
            try {
                return NodeTransformer_1.NodeTransformer.transform(project)(node);
            }
            catch (exp) {
                // ONLY ACCEPT TRANSFORMER-ERROR
                if (!isTransformerError(exp))
                    throw exp;
                // REPORT DIAGNOSTIC
                var diagnostic = typescript_1.default.createDiagnosticForNode(node, {
                    key: exp.code,
                    category: typescript_1.default.DiagnosticCategory.Error,
                    message: exp.message,
                    code: "(".concat(exp.code, ")"),
                });
                project.extras.addDiagnostic(diagnostic);
                return null;
            }
        };
    };
})(FileTransformer || (exports.FileTransformer = FileTransformer = {}));
var isTransformerError = function (error) {
    return typeof error === "object" &&
        error !== null &&
        error.constructor.name === "TransformerError" &&
        typeof error.code === "string" &&
        typeof error.message === "string";
};
var checkJsDocParsingMode = new Singleton_1.Singleton(function (project, file) {
    if (typeof file.jsDocParsingMode === "number" &&
        file.jsDocParsingMode !== 0) {
        project.extras.addDiagnostic(typescript_1.default.createDiagnosticForNode(file, {
            code: "(typia setup)",
            key: "jsDocParsingMode",
            category: typescript_1.default.DiagnosticCategory.Warning,
            message: [
                "Run \"npx typia setup\" or \"npx typia patch\" command again.",
                "",
                "Since TypeScript v5.3 update, \"tsc\" no more parses JSDoc comments. Therefore, \"typia\" also cannot utilize those JSDoc comments too, and it damages on some features of \"typia\" like \"comment tags\" or \"JSON schema\" generator.",
                "",
                "To solve this problem, run \"npx typia setup\" or \"npx typia patch\" command to hack the TypeScript compiler to revive the JSDoc parsing feature.",
                "",
                "  - reference: https://github.com/microsoft/TypeScript/pull/55739",
            ].join("\n"),
        }));
    }
});
//# sourceMappingURL=FileTransformer.js.map