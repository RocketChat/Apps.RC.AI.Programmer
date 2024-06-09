"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_array_length = void 0;
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
/**
 * @internal
 */
var check_array_length = function (project) {
    return function (array) {
        return function (input) {
            var conditions = check_string_type_tags(project)(array.tags)(input);
            return {
                expected: array.getName(),
                expression: null,
                conditions: conditions,
            };
        };
    };
};
exports.check_array_length = check_array_length;
var check_string_type_tags = function (project) {
    return function (matrix) {
        return function (input) {
            return matrix
                .map(function (row) { return row.filter(function (tag) { return !!tag.validate; }); })
                .filter(function (row) { return !!row.length; })
                .map(function (row) {
                return row.map(function (tag) {
                    var _a;
                    return ({
                        expected: "Array<> & ".concat(tag.name),
                        expression: ((_a = tag.predicate) !== null && _a !== void 0 ? _a : ExpressionFactory_1.ExpressionFactory.transpile(project.context)(tag.validate))(input),
                    });
                });
            });
        };
    };
};
//# sourceMappingURL=check_array_length.js.map