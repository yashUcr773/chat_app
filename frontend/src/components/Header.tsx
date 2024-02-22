import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { accessTokenAtom } from "../store/atoms/authAtom"
import { useLogout } from "../hooks/useLogout"
import { userAtom } from "../store/atoms/user"

export function Header() {

    const navigate = useNavigate()
    const accessToken = useRecoilValue(accessTokenAtom)
    const logout = useLogout()
    const user = useRecoilValue(userAtom)

    async function handleLogout() {
        await logout({})
    }

    return <header className="bg-gray-200 border border-black h-24 flex flex-row items-center justify-between p-8">
        <span onClick={() => navigate('/dashboard')} className="text-xl font-semibold cursor-pointer">Logo</span>
        {user?.firstname ? <span>Logged in as {user.firstname}</span> : null}
        <nav className="flex flex-row gap-4">
            {
                !accessToken ?
                    <>
                        <button onClick={() => navigate('/signin')} className="border border-black p-2 px-4 rounded-lg">Signin</button>
                        <button onClick={() => navigate('/signup')} className="bg-black text-white p-2 px-4 rounded-lg">Signup</button>
                    </> :
                    <>
                        <button onClick={() => handleLogout()} className="bg-black text-white p-2 px-4 rounded-lg">Logout</button>
                    </>
            }
        </nav>
    </header>
}