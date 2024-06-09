"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataEscaped = void 0;
var Metadata_1 = require("./Metadata");
var MetadataEscaped = /** @class */ (function () {
    /**
     * @hidden
     */
    function MetadataEscaped(props) {
        this.original = props.original;
        this.returns = props.returns;
    }
    /**
     * @internal
     */
    MetadataEscaped.from = function (props, dict) {
        return MetadataEscaped.create({
            original: Metadata_1.Metadata.from(props.original, dict),
            returns: Metadata_1.Metadata.from(props.returns, dict),
        });
    };
    /**
     * @internal
     */
    MetadataEscaped.create = function (props) {
        return new MetadataEscaped(props);
    };
    MetadataEscaped.prototype.getName = function () {
        return this.returns.getName();
    };
    MetadataEscaped.prototype.toJSON = function () {
        return {
            original: this.original.toJSON(),
            returns: this.returns.toJSON(),
        };
    };
    return MetadataEscaped;
}());
exports.MetadataEscaped = MetadataEscaped;
//# sourceMappingURL=MetadataEscaped.js.map