import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
    return (
        <div className="app w-full max-w-[98%] sm:max-w-[95%] md:max-w-[90%] px-2 sm:px-4 mx-auto pt-4 sm:pt-0">
            <Header></Header>
            <main className="main min-h-[100vh] flex flex-col items-center justify-start mt-8 sm:mt-12">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    )
}