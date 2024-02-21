import { createPortal } from "react-dom"

interface LoaderProps {
    fullPage: boolean
}

const root: any = document.querySelector('#root')

export function Loader({ fullPage }: LoaderProps) {

    if (fullPage) {
        return createPortal(
            <div className="fixed z-50 w-full h-full top-0 left-0 flex flex-row items-center justify-center bg-gray-300 opacity-50">
                <div className="inline-block h-32 w-32 animate-spin rounded-full border-8 border-solid border-current 
                    border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] opacity-1"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
                        !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            </div>,
            root)
    } else {
        return <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
            border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
                !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    }
}