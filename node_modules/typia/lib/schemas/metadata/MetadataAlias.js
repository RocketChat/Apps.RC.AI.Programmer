"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataAlias = void 0;
var MetadataAlias = /** @class */ (function () {
    /* -----------------------------------------------------------
          CONSTRUCTORS
      ----------------------------------------------------------- */
    /**
     * @hidden
     */
    function MetadataAlias(props) {
        this.name = props.name;
        this.value = props.value;
        this.description = props.description;
        this.jsDocTags = props.jsDocTags;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    /**
     * @internal
     */
    MetadataAlias.create = function (props) {
        return new MetadataAlias(props);
    };
    /**
     * @internal
     */
    MetadataAlias._From_without_value = function (props) {
        return MetadataAlias.create({
            name: props.name,
            value: null,
            description: props.description,
            recursive: props.recursive,
            jsDocTags: props.jsDocTags.slice(),
            nullables: props.nullables.slice(),
        });
    };
    MetadataAlias.prototype.toJSON = function () {
        return {
            name: this.name,
            value: this.value.toJSON(),
            description: this.description,
            recursive: this.recursive,
            jsDocTags: this.jsDocTags.slice(),
            nullables: this.nullables.slice(),
        };
    };
    return MetadataAlias;
}());
exports.MetadataAlias = MetadataAlias;
//# sourceMappingURL=MetadataAlias.js.map