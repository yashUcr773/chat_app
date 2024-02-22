import { useEffect, useState } from "react"
import { CONSTANTS } from "../../config/Constants"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { chatterAtom } from "../store/atoms/chatAtoms"

export function ChatMenu() {

    const [chats, setChats] = useState([])
    const user = useRecoilValue(userAtom)
    const customAxiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getAndSetChats = async () => {
            const response = await customAxiosPrivate(CONSTANTS.CHAT.FIND_CHAT_USER(user?.userId || ""))
            setChats(response.data.chats)
        }
        getAndSetChats()
    }, [])

    return <div className="chats-container flex flex-col gap-2 overflow-y-auto">
        {chats.length ? chats.map((chat: any) => { return <Chat key={chat._id} chat={chat}></Chat> }) : null}
    </div>
}

function Chat({ chat }: any) {

    const user = useRecoilValue(userAtom)
    const setChatters = useSetRecoilState(chatterAtom)

    const friend = chat.members[0]._id == user?.userId ? chat.members[1] : chat.members[0]
    function handleClick() {
        setChatters({
            sender: user?.userId || "",
            reciever: friend._id
        })
    }

    return (
        <div className="flex items-center  p-4 rounded-md cursor-pointer bg-slate-700 hover:bg-slate-400" onClick={handleClick}>
            <div className="flex-shrink-0 z-1">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
            </div>
            <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {friend.firstname} {friend.lastname}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {chat?.lastMessageId?.message || ""}
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {chat?.lastMessageId?.createdAt.split('T')[0] || ""}
            </div>
        </div>

    )

}