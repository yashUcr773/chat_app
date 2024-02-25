import { useSetRecoilState } from "recoil";
import { defaultUserInterface } from "../../config/types";
import { accessTokenAtom } from "../store/atoms/authAtom";
import { userAtom } from "../store/atoms/user";
import { getSocket } from "../../config/Constants";

interface currentSessionProps {
    accessToken?: string,
    userData?: defaultUserInterface
    socketEvent: ('connect' | 'disconnect' | 'dummy' | 'addNewUser')[];
}

export function useSetCurrentSession() {

    const setUser = useSetRecoilState(userAtom)
    const setAccessToken = useSetRecoilState(accessTokenAtom)

    function setCurrentSession({ accessToken, userData, socketEvent }: currentSessionProps) {
        if (accessToken != undefined && accessToken != null) {
            setAccessToken(accessToken)
        }
        if (userData != undefined && userData != null) {
            setUser(userData)
        }

        const socket = getSocket()
        for (let event of socketEvent) {
            if (event == 'connect') {
                socket.connect()
            } else if (event == 'disconnect') {
                socket.disconnect()
            } else if (event == 'addNewUser') {
                socket.emit(event, userData?.userId)
            }
        }

    }
    return setCurrentSession

}