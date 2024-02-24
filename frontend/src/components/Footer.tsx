export function Footer() {
    return (
        <footer className="rounded-lg m-4">
            <div className="w-full max-w-screen-xl mx-auto p-2">
                <div className="flex items-center justify-center">
                    <a className="flex items-center mb-0 space-x-3">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-500">SwiftChat.</span>
                    </a>
                </div>
                <hr className="my-2 border-gray-200 mx-auto dark:border-gray-700" />
                <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023. All Rights Reserved.</span>
            </div>
        </footer>
    )
}