import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
    return (
        <>
            <Header></Header>
            <main className="App bg-gray-300 border border-black h-[100vh] flex flex-row items-center justify-center">
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    )
}