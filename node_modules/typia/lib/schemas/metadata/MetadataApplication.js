"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataApplication = void 0;
var Metadata_1 = require("./Metadata");
var MetadataComponents_1 = require("./MetadataComponents");
var MetadataApplication = /** @class */ (function () {
    /**
     * @hidden
     */
    function MetadataApplication(props) {
        this.metadatas = props.metadatas;
        this.components = props.components;
    }
    /**
     * @internal
     */
    MetadataApplication.create = function (props) {
        return new MetadataApplication(props);
    };
    MetadataApplication.from = function (app) {
        var components = MetadataComponents_1.MetadataComponents.from(app.components);
        var metadatas = app.metadatas.map(function (metadata) {
            return Metadata_1.Metadata.from(metadata, components.dictionary);
        });
        return MetadataApplication.create({ metadatas: metadatas, components: components });
    };
    MetadataApplication.prototype.toJSON = function () {
        return {
            metadatas: this.metadatas.map(function (metadata) { return metadata.toJSON(); }),
            components: this.components.toJSON(),
        };
    };
    return MetadataApplication;
}());
exports.MetadataApplication = MetadataApplication;
//# sourceMappingURL=MetadataApplication.js.map