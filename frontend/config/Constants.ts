import axios from "axios"
import { io } from "socket.io-client"

export const CONSTANTS = {
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    APIBASEURL: "http://192.168.1.77:3000/",
    AUTH: {
        SIGNUP: "/auth/signup",
        SIGNIN: "/auth/signin",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/signout"
    },
    USER: {
        GET_ALL: "/api/v1/users",
        GET_BY_ID: (id: number) => { return `/api/v1/users/id/${id}` },
        GET_BY_FILTER: (filter: string) => { return `/api/v1/users/filter?mask=${filter}` }
    },
    MESSAGE: {
        GET_MESSAGESOF_CHAT: (chatId: string) => { return `/api/v1/messages/${chatId}` },
        CREATE_MESSAGE: "/api/v1/messages/create"
    },
    CHAT: {
        CREATE_CHAT: "/api/v1/chats/create",
        FIND_CHAT_USER: (userId: string) => { return `/api/v1/chats/user/${userId}` },
        FIND_CHAT_BY_MEMBERS: (mem1: string, mem2: string) => { return `/api/v1/chats/${mem1}/${mem2}` },
        FIND_CHAT_BY_ID: (chatId: string) => { return `/api/v1/chats/${chatId}` }
    }
}

let socket:any;
export function getSocket() {

    if (socket == undefined) {
        socket = io(CONSTANTS.APIBASEURL)
    }
    return socket
}


export const customAxios = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
})

export const customAxiosPrivate = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
