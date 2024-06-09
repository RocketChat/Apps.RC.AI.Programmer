"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataTupleType = void 0;
var MetadataTupleType = /** @class */ (function () {
    /**
     * @internal
     */
    function MetadataTupleType(props) {
        this.name = props.name;
        this.elements = props.elements;
        this.index = props.index;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    /**
     * @internal
     */
    MetadataTupleType._From_without_elements = function (props) {
        return MetadataTupleType.create({
            name: props.name,
            index: props.index,
            elements: null,
            recursive: props.recursive,
            nullables: props.nullables.slice(),
        });
    };
    MetadataTupleType.create = function (props) {
        return new MetadataTupleType(props);
    };
    MetadataTupleType.prototype.isRest = function () {
        return (this.elements.length > 0 &&
            this.elements[this.elements.length - 1].rest !== null);
    };
    MetadataTupleType.prototype.toJSON = function () {
        return {
            name: this.name,
            index: this.index,
            elements: this.elements.map(function (elem) { return elem.toJSON(); }),
            recursive: this.recursive,
            nullables: this.nullables.slice(),
        };
    };
    return MetadataTupleType;
}());
exports.MetadataTupleType = MetadataTupleType;
//# sourceMappingURL=MetadataTupleType.js.map