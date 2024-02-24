import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { CONSTANTS, getSocket } from "../../config/Constants";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatterAtom } from "../store/atoms/chatAtoms";
import { userAtom } from "../store/atoms/user";
import { messagesAtom } from "../store/atoms/messagesAtom";
import { notificationsAtom } from "../store/atoms/notificationsAtom";

export function ChatBox() {

    const chatters = useRecoilValue(chatterAtom)
    const customAxios = useAxiosPrivate()
    const [messages, setMessages] = useRecoilState(messagesAtom)
    const user = useRecoilValue(userAtom)
    const [friend, setFriend] = useState({} as any)
    const [text, setText] = useState('')
    const [chat, setChat] = useState({} as any)
    const messagesEndRef = useRef(undefined as any);
    const setNotifications = useSetRecoilState(notificationsAtom)

    const scrollToBottom = () => {
        messagesEndRef && messagesEndRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const getAndSetMessages = async () => {
            const chatResponse = await customAxios(CONSTANTS.CHAT.FIND_CHAT_BY_MEMBERS(chatters.sender, chatters.reciever))
            setChat(chatResponse.data.chat)

            let temp_friend = chatResponse.data.chat.members[0]._id == user?.userId ? chatResponse.data.chat.members[1] : chatResponse.data.chat.members[0]
            setFriend(temp_friend)

            setNotifications((prev: any) => {

                const updatedNotifications = prev.map((noti: any) => {
                    if (noti?.chatId === chatResponse.data.chat._id) {
                        return { ...noti, isRead: true };
                    }
                    return { ...noti }
                })

                return updatedNotifications
            })

            const messagesResponse = await customAxios(CONSTANTS.MESSAGE.GET_MESSAGESOF_CHAT(chatResponse.data.chat._id))
            setMessages(messagesResponse.data.messages)
        }

        chatters.sender != "" && getAndSetMessages()

        const socket = getSocket()
        socket.on('getMessage', (message: any) => {
            setMessages((prev: any) => [...prev, message])
        })

        return () => {
            setFriend({})
            socket.off('getMessage')
        }
    }, [chatters])


    async function sendMessage(e: any) {
        e.preventDefault()
        try {

            const response = await customAxios.post(CONSTANTS.MESSAGE.CREATE_MESSAGE, {
                message: text, chatId: chat._id, senderId: user?.userId
            })

            setMessages((prev: any) => [...prev, response.data.createdMessage])
            setText("")

            const socket = getSocket()
            socket.emit('sendMessage', { senderId: user?.userId, message: response.data.createdMessage, receiverId: friend._id, chatId: chat._id })
        } catch (e) {
            console.log(e)
        }
    }

    return <div className="flex-grow h-full bg-white dark:bg-gray-800 rounded-lg ">
        {friend.firstname ?
            <div className="w-full h-full chat-box flex flex-col ">

                <div className="box-header flex flex-row gap-4 items-center justify-start p-4 border-b-2 border-gray-200 dark:border-gray-700 h-20">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <span>{friend.firstname} {friend.lastname}</span>
                </div>

                <div className="box-body flex-grow flex flex-col p-2 justify-end overflow-y-auto min-h-96 h-full">
                    <div className="flex flex-col overflow-auto">
                        {messages.map((message: any) => { return <Message key={message._id} message={message.message} complete={message}></Message> })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <form className="flex items-center w-full mx-auto p-4 border-t-2 border-gray-200 dark:border-gray-700 h-20" onSubmit={sendMessage}>

                    <label htmlFor="send-message" className="sr-only">Send Message</label>

                    <input type="text" id="send-message"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Message" required
                        value={text} onChange={(e) => setText(e.target.value)}
                    />

                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-primary-700 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Send
                    </button>

                </form>
            </div>
            :
            <div className="flex items-center justify-center px-6 py-12 mx-auto h-full w-full">
                <h1
                    className="mt-3 text-xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                    Click on a user to open Chat
                </h1>

            </div>
        }
    </div>

}

function Message({ message, complete }: any) {
    const user = useRecoilValue(userAtom)
    const sent = complete.senderId !== user?.userId

    if (sent) {
        return <span className={`bg-primary-100 text-primary-800 text-lg font-medium px-3 py-2 m-0.5 rounded-xl dark:bg-primary-900 dark:text-green-300 self-start`}>{message}</span>
    } else {
        return <span className={`bg-blue-100 text-blue-800 text-lg font-medium px-3 py-2 m-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300 self-end`}>{message}</span>
    }

}

