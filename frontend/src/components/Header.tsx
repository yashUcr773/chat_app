import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessTokenAtom } from "../store/atoms/authAtom"
import { useLogout } from "../hooks/useLogout"
import { userAtom } from "../store/atoms/user"
import { notificationsAtom } from "../store/atoms/notificationsAtom"
import { useEffect } from "react"
import { getSocket } from "../../config/Constants"

export function Header() {

    const navigate = useNavigate()
    const accessToken = useRecoilValue(accessTokenAtom)
    const logout = useLogout()
    const user = useRecoilValue(userAtom)
    const [notifications, setNotifications] = useRecoilState(notificationsAtom)

    useEffect(() => {
        const socket = getSocket()

        socket.on('getNotifications', (notification: any) => {
            setNotifications((prev: any) => [...prev, notification])
        })
        return () => {
            socket.off('getNotifications')
        }
    }, [])

    function getNotificationsCount() {
        return notifications && notifications.reduce((prev: number, curr: any) => {
            if (curr?.isRead === false) {
                return prev + 1
            }
            return prev

        }, 0) || 0
    }


    async function handleLogout() {
        await logout({})
    }

    return <header className="bg-gray-200 border border-black h-24 flex flex-row items-center justify-between p-8">
        <span onClick={() => navigate('/dashboard')} className="text-xl font-semibold cursor-pointer">Logo</span>
        {user?.firstname ? <span>Logged in as {user.firstname}</span> : null}
        <nav className="flex flex-row gap-4">
            {
                !accessToken ?
                    <>
                        <button onClick={() => navigate('/signin')} className="border border-black p-2 px-4 rounded-lg">Signin</button>
                        <button onClick={() => navigate('/signup')} className="bg-black text-white p-2 px-4 rounded-lg">Signup</button>
                    </> :
                    <>
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{getNotificationsCount()}</div>
                        </button>
                        <button onClick={() => handleLogout()} className="bg-black text-white p-2 px-4 rounded-lg">Logout</button>
                    </>
            }
        </nav>
    </header>
}