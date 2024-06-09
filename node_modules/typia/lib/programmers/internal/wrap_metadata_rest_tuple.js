"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap_metadata_rest_tuple = void 0;
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataArray_1 = require("../../schemas/metadata/MetadataArray");
var MetadataArrayType_1 = require("../../schemas/metadata/MetadataArrayType");
var wrap_metadata_rest_tuple = function (rest) {
    var wrapper = Metadata_1.Metadata.initialize();
    wrapper.arrays.push(MetadataArray_1.MetadataArray.create({
        type: MetadataArrayType_1.MetadataArrayType.create({
            name: "...".concat(rest.getName()),
            value: rest,
            nullables: [],
            recursive: false,
            index: null,
        }),
        tags: [],
    }));
    return wrapper;
};
exports.wrap_metadata_rest_tuple = wrap_metadata_rest_tuple;
//# sourceMappingURL=wrap_metadata_rest_tuple.js.map