import { createPortal } from "react-dom"

interface LoaderProps {
    fullPage?: boolean
    size?: number
}

const root: any = document.querySelector('#root')

export function Loader({ fullPage = false, size = 4 }: LoaderProps) {

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
            className={`inline-block animate-spin rounded-full border-solid border-current 
            border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] h-${size} w-${size} border-${size/2}`}
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
                !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    }
}