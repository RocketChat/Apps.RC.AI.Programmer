export declare namespace TypiaProgrammer {
    interface IProps {
        input: string;
        output: string;
        project: string;
    }
    const build: (props: TypiaProgrammer.IProps) => Promise<void>;
}
