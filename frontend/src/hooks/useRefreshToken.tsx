import { useSetRecoilState } from "recoil";
import { CONSTANTS, customAxios } from "../../config/Constants";
import { accessTokenAtom } from "../store/atoms/authAtom";
import { useSetCurrentSession } from "./useSetCurrentSession";


export function useRefreshToken({ sendUserData }: any) {


    let baseurl = CONSTANTS.AUTH.REFRESH
    if (sendUserData) {
        baseurl += '?sendUserData=true'
    }

    const setAccessToken = useSetRecoilState(accessTokenAtom)
    const setCurrentSession = useSetCurrentSession()

    const refresh = async () => {
        const response = await customAxios.get(baseurl, { withCredentials: true })
        if (sendUserData) {
            setCurrentSession({ accessToken: response.data.newAccessToken, userData: response.data.user })
        } else {
            setCurrentSession({ accessToken: response.data.newAccessToken })
        }
        setAccessToken(response.data.newAccessToken)
        return response.data.newAccessToken
    }
    return refresh
}