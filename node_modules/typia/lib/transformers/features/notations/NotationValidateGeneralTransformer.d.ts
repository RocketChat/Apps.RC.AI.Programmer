/// <reference types="ts-expose-internals/typescript" />
export declare namespace NotationValidateGeneralTransformer {
    const transform: (rename: (str: string) => string) => (project: import("../../IProject").IProject) => (modulo: import("typescript").LeftHandSideExpression) => (expression: import("typescript").CallExpression) => import("typescript").CallExpression;
}
