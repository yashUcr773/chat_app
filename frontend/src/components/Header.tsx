import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessTokenAtom } from "../store/atoms/authAtom"
import { useLogout } from "../hooks/useLogout"
import { userAtom } from "../store/atoms/user"
import { notificationsAtom } from "../store/atoms/notificationsAtom"
import { useEffect, useState } from "react"
import { getSocket } from "../../config/Constants"

export function Header() {

    const accessToken = useRecoilValue(accessTokenAtom)
    const logout = useLogout()
    const user = useRecoilValue(userAtom)
    const [notifications, setNotifications] = useRecoilState(notificationsAtom)
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('color-theme') === 'dark' ||
          (!localStorage.getItem('color-theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );

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

    useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      }, [isDarkMode]);

      const toggleTheme = () => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
      };

    async function handleLogout() {
        await logout({})
    }

    return (
        <header>
            <nav className="h-16 flex items-center justify-center">
                <div className="flex flex-wrap gap-2 justify-between items-center mx-auto w-full">

                    <Link to="/dashboard" className="logo flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-primary-500">SwiftChat.</span>
                    </Link>
                    <div className="flex flex-row gap-2 items-center justify-center ">
                        <button id="theme-toggle" type="button" onClick={toggleTheme}
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1">
                            <svg id="theme-toggle-dark-icon" className={`size-6 ${!isDarkMode ? '' : 'hidden'}`} fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg id="theme-toggle-light-icon" className={`size-6 ${isDarkMode ? '' : 'hidden'}`} fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </button>
                        {
                            !accessToken ?
                                <div className="flex items-center lg:order-2">
                                    <Link to="/signin"
                                        className="text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        Log in</Link>
                                    <Link to="/signup"
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        Get started</Link>
                                </div> :

                                <div className="flex items-center lg:order-2">
                                    <button type="button" className="relative text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2 mr-4 mt-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                        <span className="sr-only">Notifications</span>
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{getNotificationsCount()}</div>
                                    </button>
                                    <a onClick={() => handleLogout()}
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium cursor-pointer rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        Log out</a>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}
// TODO : ADD LOGIN BANNER
// {user?.firstname ? <span>Logged in as {user.firstname}</span> : null}