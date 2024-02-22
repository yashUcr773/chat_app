import { useState } from "react";
import { Section } from "../wrappers/Section";
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
        <Section className="!justify-start !items-start !border-0 !border-b-4 border-slate-900">
            <label htmlFor="findUsers" className="text-xl font-bold">Find Users</label>
            <div className="flex flex-row gap-4 w-full items-start">
                <div className="flex flex-col gap-4 w-full relative">
                    <input id="findUsers"
                        value={search}
                        onChange={handleInputChange}
                        className="border border-black p-4 w-full bg-gray-200 rounded-xl"
                        placeholder="Enter Name"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => { setIsFocused(false) }, 100)}
                    ></input>
                    {isFocused && users.length ?
                        <div className="bg-gray-100 z-10 rounded-lg w-full p-4 space-y-2 divide-y-2 text-lg absolute top-16 overflow-y-auto max-h-60">
                            {users.map((user: any) => currentUser?.userId != user._id ? <User key={user._id} id={user._id} firstname={user.firstname} lastname={user.lastname}></User> : null)}
                        </div> :
                        ""}
                </div>
                <button className="border border-black p-4 rounded-lg text-white bg-black">Search</button>
            </div>
        </Section>
    )
}

function User({ id, firstname, lastname }: any) {
    const setChatters = useSetRecoilState(chatterAtom)
    const user = useRecoilValue(userAtom)

    function handleClick() {
        setChatters({
            sender: user?.userId || "",
            reciever: id
        })
    }

    return (
        <div key={id} className="p-2 hover:bg-red-200 rounded-lg cursor-pointer" onClick={handleClick}>
            {firstname}, {lastname}
        </div>
    )
}

