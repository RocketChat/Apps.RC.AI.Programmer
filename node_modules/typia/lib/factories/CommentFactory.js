"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var CommentFactory;
(function (CommentFactory) {
    CommentFactory.description = function (symbol, includeTags) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d, _e, _f;
        if (includeTags === void 0) { includeTags = false; }
        var node = (_d = symbol.declarations) === null || _d === void 0 ? void 0 : _d[0];
        if (!node)
            return undefined;
        // FOR LEGACY TS < 5.2
        var _g = __read(typescript_1.default.versionMajorMinor.split(".").map(Number), 2), major = _g[0], minor = _g[1];
        if (major < 5 || (major === 5 && minor < 1)) {
            var content_1 = [];
            var main_1 = typescript_1.default.displayPartsToString(symbol.getDocumentationComment(undefined));
            if (main_1.length) {
                content_1.push(main_1);
                if (includeTags && symbol.getJsDocTags().length)
                    content_1.push("");
            }
            if (includeTags)
                try {
                    for (var _h = __values(symbol.getJsDocTags()), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var tag = _j.value;
                        content_1.push(tag.text
                            ? "@".concat(tag.name, " ").concat(typescript_1.default.displayPartsToString(tag.text))
                            : "@".concat(tag.name));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            return content_1.length
                ? content_1.map(function (line) { return line.split("\r\n").join("\n"); }).join("\n")
                : undefined;
        }
        // NEW FEATURE OF TS 5.2
        var elements = typescript_1.default.getJSDocCommentsAndTags(node);
        if (elements.length === 0)
            return undefined;
        var content = [];
        try {
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var comment = elements_1_1.value;
                if (typescript_1.default.isJSDoc(comment)) {
                    var parsed = typescript_1.default.getTextOfJSDocComment(comment.comment);
                    if (parsed === null || parsed === void 0 ? void 0 : parsed.length) {
                        content.push(parsed);
                        if (includeTags && ((_e = comment.tags) === null || _e === void 0 ? void 0 : _e.length))
                            content.push("");
                    }
                    if (includeTags)
                        try {
                            for (var _k = (e_3 = void 0, __values((_f = comment.tags) !== null && _f !== void 0 ? _f : [])), _l = _k.next(); !_l.done; _l = _k.next()) {
                                var tag = _l.value;
                                content.push(parseJSDocTag(tag));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                }
                else if (includeTags)
                    content.push(parseJSDocTag(comment));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var output = content
            .map(function (line) { return line.split("\r\n").join("\n"); })
            .join("\n");
        return output.length ? output : undefined;
    };
    CommentFactory.merge = function (comments) {
        return comments
            .map(function (part) { return part.text; })
            .map(function (str) { return str.split("\r\n").join("\n"); })
            .join("");
    };
})(CommentFactory || (exports.CommentFactory = CommentFactory = {}));
var parseJSDocTag = function (tag) {
    var _a;
    var name = (_a = tag.name) === null || _a === void 0 ? void 0 : _a.getText();
    var parsed = typescript_1.default.getTextOfJSDocComment(tag.comment);
    return ["@".concat(tag.tagName.text), name, parsed]
        .filter(function (str) { return !!(str === null || str === void 0 ? void 0 : str.length); })
        .join(" ");
};
//# sourceMappingURL=CommentFactory.js.map