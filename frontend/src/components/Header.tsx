import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessTokenAtom } from "../store/atoms/authAtom"
import { useLogout } from "../hooks/useLogout"
import { userAtom } from "../store/atoms/user"
import { notificationsAtom } from "../store/atoms/notificationsAtom"
import { useEffect, useRef, useState } from "react"
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

    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null as any);

    useEffect(() => {
        const socket = getSocket()

        socket.on('getNotifications', (notification: any) => {
            setNotifications((prev: any) => [...prev, notification])
        })
        return () => {
            socket.off('getNotifications')
        }
    }, [])
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
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
            <nav className="h-fit flex items-center justify-center p-4">
                <div className="flex flex-col xs:flex-row gap-2 justify-between items-center mx-auto w-full">

                    <Link to="/dashboard" className="logo flex flex-row gap-1 justify-center items-center">
                        <img src="/logo.png" alt="Logo" className="size-6"/>
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


                                    <button
                                        id="dropdownInformationButton"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDropdown(p => !p);
                                        }}
                                        aria-expanded={showDropdown}
                                        aria-haspopup="true"
                                        className="relative px-4 py-2 rounded-lg flex flex-row gap-4 items-center justify-center bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700"
                                        type="button"
                                    >
                                        <span className="pointer-events-none">{user && user.firstname}</span>
                                        <div className="pointer-events-none relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div
                                            ref={dropdownRef}
                                            id="dropdownInformation"
                                            className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600 top-0 right-0 mt-16 ${showDropdown ? 'block' : 'hidden'}`}
                                            role="menu"
                                        >
                                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                <div className="truncate">{user?.firstname} {user?.lastname}</div>
                                                <div className="font-medium truncate">{user?.email}</div>
                                            </div>

                                            <div className="py-2">
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleLogout();
                                                    }}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Sign out
                                                </a>
                                            </div>
                                        </div>
                                    </button>





                                </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}