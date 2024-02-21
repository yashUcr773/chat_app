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
        GETALL: "/users",
        GETBYID: "/users/"
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
