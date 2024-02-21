import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../store/atoms/authAtom";
import { Navigate, Outlet } from "react-router-dom";

export function IsLoggedIn() {
    const accessToken = useRecoilValue(accessTokenAtom)

    return accessToken ? <Navigate to="/" /> : <Outlet />

}