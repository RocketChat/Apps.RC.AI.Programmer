"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
var child_process_1 = __importDefault(require("child_process"));
var CommandExecutor;
(function (CommandExecutor) {
    CommandExecutor.run = function (str) {
        console.log("\n$ ".concat(str));
        child_process_1.default.execSync(str, { stdio: "inherit" });
    };
})(CommandExecutor || (exports.CommandExecutor = CommandExecutor = {}));
//# sourceMappingURL=CommandExecutor.js.map