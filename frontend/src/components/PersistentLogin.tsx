import { useEffect, useState } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../store/atoms/authAtom";
import { Loader } from "./Loader";
import { Outlet } from "react-router-dom";

export function PersistentLogin() {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken({ sendUserData: true })
    const accessToken = useRecoilValue(accessTokenAtom)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        !accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    return isLoading ? <Loader fullPage={true} /> : <Outlet />
}