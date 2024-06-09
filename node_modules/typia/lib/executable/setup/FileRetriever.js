"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRetriever = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var FileRetriever;
(function (FileRetriever) {
    FileRetriever.directory = function (name) {
        return function (dir, depth) {
            if (depth === void 0) { depth = 0; }
            var location = path_1.default.join(dir, name);
            if (fs_1.default.existsSync(location))
                return dir;
            else if (depth > 2)
                return null;
            return FileRetriever.directory(name)(path_1.default.join(dir, ".."), depth + 1);
        };
    };
    FileRetriever.file = function (name) {
        return function (directory, depth) {
            if (depth === void 0) { depth = 0; }
            var location = path_1.default.join(directory, name);
            if (fs_1.default.existsSync(location))
                return location;
            else if (depth > 2)
                return null;
            return FileRetriever.file(name)(path_1.default.join(directory, ".."), depth + 1);
        };
    };
})(FileRetriever || (exports.FileRetriever = FileRetriever = {}));
//# sourceMappingURL=FileRetriever.js.map