"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataTuple = void 0;
var MetadataTuple = /** @class */ (function () {
    /**
     * @hidden
     */
    function MetadataTuple(props) {
        this.type = props.type;
        this.tags = props.tags;
    }
    /**
     * @internal
     */
    MetadataTuple.create = function (props) {
        return new MetadataTuple(props);
    };
    MetadataTuple.prototype.toJSON = function () {
        return {
            type: this.type.toJSON(),
            tags: this.tags.map(function (row) { return row.slice(); }),
        };
    };
    return MetadataTuple;
}());
exports.MetadataTuple = MetadataTuple;
//# sourceMappingURL=MetadataTuple.js.map