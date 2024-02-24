import { useEffect, useState } from "react"
import { CONSTANTS, getSocket } from "../../config/Constants"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { chatterAtom } from "../store/atoms/chatAtoms"
import { notificationsAtom } from "../store/atoms/notificationsAtom"

export function ChatMenu() {

    const [chats, setChats] = useState([])
    const user = useRecoilValue(userAtom)
    const customAxiosPrivate = useAxiosPrivate()
    const [showChats, setShowChats] = useState(true)

    useEffect(() => {
        const getAndSetChats = async () => {
            const response = await customAxiosPrivate(CONSTANTS.CHAT.FIND_CHAT_USER(user?.userId || ""))
            setChats(response.data.chats)
        }
        getAndSetChats()
    }, [])

    return (
        <section className="flex flex-col gap-2 items-start justify-start">
            <div className="flex flex-row justify-between items-center w-full">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-full text-left">Active Chats</span>
                <button onClick={() => setShowChats(prev => !prev)} >
                    {showChats ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    }
                </button>
            </div>
            {showChats && <div className="chats-container flex flex-col gap-1 overflow-y-auto w-full max-h-[60vh] overflow-auto">
                {chats.length ? chats.map((chat: any) => { return <Chat key={chat._id} chat={chat}></Chat> }) : null}
            </div>}
        </section>
    )
}

function Chat({ chat }: any) {

    const [isOnline, setIsOnline] = useState(true)
    const user = useRecoilValue(userAtom)
    const friend = chat.members[0]._id == user?.userId ? chat.members[1] : chat.members[0]
    const setChatters = useSetRecoilState(chatterAtom)
    const notifications = useRecoilValue(notificationsAtom)

    useEffect(() => {
        const socket = getSocket()

        socket.on('getOnlineUsers', (onlineUsers: any) => {
            const online = !!onlineUsers.find((users: any) => users.userId === friend?._id)
            setIsOnline(!!online)
        })
        socket.emit('askForOnlineUsers')
        return () => {
            socket.off('getOnlineUsers')
        }
    }, [])


    function openChat() {
        setChatters({
            sender: user?.userId || "",
            reciever: friend._id
        })
    }

    function formatDate(dateString: string) {
        const date: any = new Date(dateString);
        const now: any = new Date();

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else {
            return formattedDate;
        }
    }

    function getNotificationsCount() {
        return notifications && notifications.reduce((prev: number, curr: any) => {
            if (curr?.isRead === false && curr?.chatId == chat._id) {
                return prev + 1
            }
            return prev

        }, 0) || 0
    }

    return (
        <div
            className="flex items-center gap-2 p-4 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 relative h-24"
            onClick={openChat}>

            <div className={`absolute size-2 bg-primary-500 rounded-full z-1 right-2 top-2 ${isOnline ? "block" : "hidden"}`}></div>

            <div className="flex-shrink-0 z-1">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
            </div>

            <div className="flex-auto min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {friend.firstname} {friend.lastname}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {chat?.lastMessageId?.message || ""}
                </p>
            </div>

            <div className="flex-1 w-fit flex justify-end flex-col items-end gap-2">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {formatDate(chat?.lastMessageId?.createdAt) || ""}

                </p>
                <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    <div className={` inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary-500 rounded-full -top-2 -end-2 dark:border-gray-900 ${getNotificationsCount() ? 'block' : 'hidden'}`}>{getNotificationsCount()}</div>
                </div>
            </div>
        </div>

    )

}
