import { useState } from "react";
import { useDebouncer } from "../hooks/useDebouncer";
import { CONSTANTS } from "../../config/Constants";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatterAtom } from "../store/atoms/chatAtoms";
import { userAtom } from "../store/atoms/user";


export function FindUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const customAxiosPrivate = useAxiosPrivate()
    const currentUser = useRecoilValue(userAtom)

    const debouncedSearch = useDebouncer(async (search: string) => {
        let response = await customAxiosPrivate(CONSTANTS.USER.GET_BY_FILTER(search))
        setUsers(response.data.users)
    }, 300);


    function handleInputChange(e: any) {
        setSearch(e.target.value)
        debouncedSearch(e.target.value)
    }

    return (
        <section className="flex flex-col gap-2 items-start justify-start border-b-2 border-gray-200 dark:border-gray-700 pb-2">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-full text-left">Find Users</span>

            <form className="flex items-center max-w-sm mx-auto w-full relative align-middle justify-center" onSubmit={(e) => { e.preventDefault() }}>
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <input type="text" id="simple-search"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Name" required
                    value={search}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => { setIsFocused(false) }, 100)}
                />
                <svg className="w-4 h-4 absolute top-3 right-2 pointer-events-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </form>

            <div className="w-full relative">
                {
                    isFocused && users.length ?
                        <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 absolute  max-h-80 overflow-y-auto">
                            {users.map((user: any) => currentUser?.userId != user._id ? <User key={user._id} user={user}></User> : null)}
                        </div> :
                        ""
                }
            </div>

        </section>
    )
}

function User({ user }: any) {

    const setChatters = useSetRecoilState(chatterAtom)
    const currUser = useRecoilValue(userAtom)

    function handleClick() {
        setChatters({
            sender: currUser?.userId || "",
            reciever: user._id
        })
    }
    return (
        <div className="px-4 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white whitespace-nowrap overflow-hidden text-ellipsis" onClick={handleClick}>
            {user.firstname}, {user.lastname} <span className="text-xs text-gray-700 dark:text-white">({user.email})</span>
        </div>
    )
}
