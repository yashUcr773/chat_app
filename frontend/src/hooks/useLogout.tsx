import { CONSTANTS, customAxios } from "../../config/Constants";
import { useSetCurrentSession } from "../hooks/useSetCurrentSession";
import { defaultUser } from "../../config/defaults";
import { useNavigate } from "react-router-dom";

interface useLogoutProps {
    toLink?: string
}

export function useLogout() {

    const navigate = useNavigate();
    const setSession = useSetCurrentSession()

    async function logout({ toLink }: useLogoutProps) {
        try {
            await customAxios(CONSTANTS.AUTH.LOGOUT, { withCredentials: true })

        } catch (e) {
            console.log(e)
        } finally {
            setSession({ accessToken: "", userData: defaultUser, socketEvent: ['disconnect'] })
            if (toLink) {
                navigate(toLink)
            } else {
                navigate('/')
            }
        }
    }

    return logout

}