export function Section({ children, className, override = false }: any) {

    return (
        <section className={!override ? "border border-black flex flex-col gap-4 p-4 rounded-lg text-md font-normal items-center justify-center" + className : className}>
            {children}
        </section>
    );
};