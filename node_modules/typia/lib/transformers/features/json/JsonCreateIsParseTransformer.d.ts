/// <reference types="ts-expose-internals/typescript" />
export declare namespace JsonCreateIsParseTransformer {
    const transform: (project: import("../../IProject").IProject) => (modulo: import("typescript").LeftHandSideExpression) => (expression: import("typescript").CallExpression) => import("typescript").ArrowFunction;
}
