"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataArrayType = void 0;
var MetadataArrayType = /** @class */ (function () {
    /**
     * @hidden
     */
    function MetadataArrayType(props) {
        this.name = props.name;
        this.value = props.value;
        this.index = props.index;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    /**
     * @internal
     */
    MetadataArrayType._From_without_value = function (props) {
        return MetadataArrayType.create({
            name: props.name,
            value: null,
            index: props.index,
            recursive: props.recursive,
            nullables: props.nullables,
        });
    };
    /**
     * @internal
     */
    MetadataArrayType.create = function (props) {
        return new MetadataArrayType(props);
    };
    MetadataArrayType.prototype.toJSON = function () {
        return {
            name: this.name,
            value: this.value.toJSON(),
            nullables: this.nullables,
            recursive: this.recursive,
            index: this.index,
        };
    };
    return MetadataArrayType;
}());
exports.MetadataArrayType = MetadataArrayType;
//# sourceMappingURL=MetadataArrayType.js.map