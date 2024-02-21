import { useSetRecoilState } from "recoil";
import { defaultUserInterface } from "../../config/types";
import { accessTokenAtom } from "../store/atoms/authAtom";
import { userAtom } from "../store/atoms/user";

interface currentSessionProps {
    accessToken?: string,
    userData?: defaultUserInterface
}

export function useSetCurrentSession() {

    const setUser = useSetRecoilState(userAtom)
    const setAccessToken = useSetRecoilState(accessTokenAtom)

    function setCurrentSession({ accessToken, userData }: currentSessionProps) {
        if (accessToken != undefined && accessToken != null) {
            setAccessToken(accessToken)
        }
        if (userData != undefined && userData != null) {
            setUser(userData)
        }
    }
    return setCurrentSession

}