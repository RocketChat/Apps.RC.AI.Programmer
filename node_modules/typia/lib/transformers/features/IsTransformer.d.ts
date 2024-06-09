/// <reference types="ts-expose-internals/typescript" />
export declare namespace IsTransformer {
    const transform: (equals: boolean) => (project: import("../IProject").IProject) => (modulo: import("typescript").LeftHandSideExpression) => (expression: import("typescript").CallExpression) => import("typescript").CallExpression;
}
