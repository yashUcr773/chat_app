import axios from "axios"

export const CONSTANTS = {
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    APIBASEURL: "http://localhost:3000",
    AUTH: {
        SIGNUP: "/auth/signup",
        SIGNIN: "/auth/signin",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/signout"
    },
    USER: {
        GET_ALL: "/ap1/v1/users",
        GET_BY_ID: "/ap1/v1/users/"
    },
    MESSAGE: {
        GET_MESSAGES: "/ap1/v1/messages/",
        CREATE_MESSAGE: "/ap1/v1/messages/create"
    },
    CHAT: {
        CREATE_CHAT: "/ap1/v1/chats/create",
        FIND_CHAT_USER: "/ap1/v1/user/chats/",
        FIND_CHAT_BY_MEMBERS: "/ap1/v1/chats/",
        FIND_CHAT_BY_ID: "/ap1/v1/chats/"
    }
}

export const customAxios = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
})

export const customAxiosPrivate = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
    headers: { 'Content-Type': 'applications/json' },
    withCredentials: true
})
