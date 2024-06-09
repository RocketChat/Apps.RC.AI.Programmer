"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportTransformer = void 0;
var path_1 = __importDefault(require("path"));
var typescript_1 = __importDefault(require("typescript"));
var ImportTransformer;
(function (ImportTransformer) {
    ImportTransformer.transform = function (from) {
        return function (to) {
            return function (context) {
                return function (file) {
                    return transform_file(from)(to)(context)(file);
                };
            };
        };
    };
    var transform_file = function (top) {
        return function (to) {
            return function (context) {
                return function (file) {
                    if (file.isDeclarationFile)
                        return file;
                    var from = get_directory_path(path_1.default.resolve(file.getSourceFile().fileName));
                    to = from.replace(top, to);
                    return typescript_1.default.visitEachChild(file, function (node) { return transform_node(top)(from)(to)(node); }, context);
                };
            };
        };
    };
    var transform_node = function (top) { return function (from) { return function (to) { return function (node) {
        if (!typescript_1.default.isImportDeclaration(node) ||
            !typescript_1.default.isStringLiteral(node.moduleSpecifier))
            return node;
        var text = node.moduleSpecifier.text;
        if (text[0] !== ".")
            return node;
        var location = path_1.default.resolve(from, text);
        if (location.indexOf(top) === 0)
            return node;
        var replaced = (function () {
            var simple = path_1.default
                .relative(to, location)
                .split(path_1.default.sep)
                .join("/");
            return simple[0] === "." ? simple : "./".concat(simple);
        })();
        return typescript_1.default.factory.createImportDeclaration(undefined, node.importClause, typescript_1.default.factory.createStringLiteral(replaced), node.assertClause);
    }; }; }; };
})(ImportTransformer || (exports.ImportTransformer = ImportTransformer = {}));
var get_directory_path = function (file) {
    var splitted = path_1.default.resolve(file).split(path_1.default.sep);
    splitted.pop();
    return path_1.default.resolve(splitted.join(path_1.default.sep));
};
//# sourceMappingURL=ImportTransformer.js.map