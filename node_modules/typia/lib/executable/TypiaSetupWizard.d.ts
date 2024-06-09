export declare namespace TypiaSetupWizard {
    interface IArguments {
        manager: "npm" | "pnpm" | "yarn";
        project: string | null;
    }
    function setup(): Promise<void>;
}
