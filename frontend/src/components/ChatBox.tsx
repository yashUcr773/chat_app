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
            console.log('opened chat', chatResponse.data.chat)

            let temp_friend = chatResponse.data.chat.members[0]._id == user?.userId ? chatResponse.data.chat.members[1] : chatResponse.data.chat.members[0]
            setFriend(temp_friend)

            setNotifications((prev: any) => {

                console.log('prev', JSON.parse(JSON.stringify(prev)))
                const updatedNotifications = prev.map((noti: any) => {
                    console.log(noti?.chatId, chatResponse.data.chat._id, noti?.chatId === chatResponse.data.chat._id)
                    if (noti?.chatId === chatResponse.data.chat._id) {
                        return { ...noti, isRead: true };
                    }
                    return {...noti}
                })
                console.log('updatedNotifications', JSON.parse(JSON.stringify(updatedNotifications)))

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


    async function sendMessage() {
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

    return <div className="flex-grow h-full">
        {friend.firstname ?
            <div className="w-full h-full chat-box flex flex-col">

                <div className="box-header flex flex-row gap-4 items-center justify-start p-4 border-b-8 border-green-500 h-20">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <span>{friend.firstname} {friend.lastname}</span>
                </div>

                <div className="box-body flex-grow flex flex-col p-2 border-b-4  justify-end border-2 border-red-500 overflow-y-auto h-60">
                    <div className="flex flex-col overflow-auto">
                        {messages.map((message: any) => { return <Message key={message._id} message={message.message} complete={message}></Message> })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="box-footer h-20 gap-4 flex flex-row p-2 py-4">
                    <input className="w-full p-4 bg-gray-100 rounded-lg" placeholder="Enter Message" value={text} onChange={(e) => setText(e.target.value)}></input>
                    <button className="px-4 py-2 bg-black text-white rounded-md" onClick={sendMessage}>Send</button>
                </div>

            </div>
            : null
        }
    </div>

}

function Message({ message, complete }: any) {
    const user = useRecoilValue(userAtom)
    const sent = complete.senderId !== user?.userId

    return <span className={`p-2 mx-2 border border-black w-fit rounded-md ${sent ? "self-start" : "self-end"} ${sent ? "bg-green-200" : "bg-blue-200"}`}>{message}</span>
}