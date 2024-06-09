"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataProperty = void 0;
var Metadata_1 = require("./Metadata");
var MetadataProperty = /** @class */ (function () {
    /* -----------------------------------------------------------
          CONSTRUCTORS
      ----------------------------------------------------------- */
    /**
     * @hidden
     */
    function MetadataProperty(props) {
        this.key = props.key;
        this.value = props.value;
        this.description = props.description;
        this.jsDocTags = props.jsDocTags;
    }
    /**
     * @internal
     */
    MetadataProperty.create = function (props) {
        return new MetadataProperty(props);
    };
    /**
     * @internal
     */
    MetadataProperty.from = function (property, dict) {
        return MetadataProperty.create({
            key: Metadata_1.Metadata.from(property.key, dict),
            value: Metadata_1.Metadata.from(property.value, dict),
            description: property.description,
            jsDocTags: property.jsDocTags.slice(),
        });
    };
    MetadataProperty.prototype.toJSON = function () {
        return {
            key: this.key.toJSON(),
            value: this.value.toJSON(),
            description: this.description,
            jsDocTags: this.jsDocTags,
        };
    };
    return MetadataProperty;
}());
exports.MetadataProperty = MetadataProperty;
//# sourceMappingURL=MetadataProperty.js.map