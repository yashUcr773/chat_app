import { Route, Routes } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Layout } from "./Layout";
import { Unauthorized } from "./Unauthorized";
import { Dashboard } from "./Dashboard";
import { Missing } from "./Missing";
import { RequireAuth } from "../components/RequireAuth";
import { PersistentLogin } from "../components/PersistentLogin";
import { IsLoggedIn } from "../components/IsLoggedIn";

export function Main() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                {/* public routes */}
                <Route element={<IsLoggedIn />}>
                    <Route path='signin' element={<Signin />}></Route>
                    <Route path='signup' element={<Signup />}></Route>
                </Route>
                <Route path='unauthorized' element={<Unauthorized />}></Route>

                {/* Protected */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth />} >
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/dashboard' element={<Dashboard />}></Route>
                    </Route>
                </Route>
                {/* Catch All */}
                <Route path='*' element={<Missing />}></Route>

            </Route>
        </Routes >
    )
}
