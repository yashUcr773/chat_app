export function Section({ children, className }: any) {

    return (
        <section className={"border border-black flex flex-col gap-4 p-4 rounded-lg text-md font-normal items-center justify-center" + className}>
            {children}
        </section>
    );
};