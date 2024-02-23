import { useEffect, useState } from "react"
import { Loader } from "../components/Loader"
import { useLocation, useNavigate } from "react-router-dom"
import { customAxios } from '../../config/Constants'
import { CONSTANTS } from "../../config/Constants";
import { useSetCurrentSession } from "../hooks/useSetCurrentSession";
import { defaultUser } from '../../config/defaults'
import { Section } from "../wrappers/Section";

export function Signin() {

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const [email, setEmail] = useState("user-email-1@gmail.com")
    const [password, setPassword] = useState("Compro@11")
    const [err, setErr] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    const setCurrentSession = useSetCurrentSession()

    useEffect(() => {
        setErr("")
    }, [email, password])

    async function handleSubmit(e: any) {
        e.preventDefault()
        setShowLoader(true)
        try {
            const response = await customAxios.post(CONSTANTS.AUTH.SIGNIN, { email, password }, { withCredentials: true })
            const { accessToken, ...user } = response.data.user
            setCurrentSession({ accessToken, userData: user, socketEvent: ['connect', 'addNewUser'] })

            navigate(from, { replace: true })

        } catch (e: any) {
            setCurrentSession({ accessToken: "", userData: defaultUser, socketEvent: ['disconnect'] })

            setErr(e.response.data.message)
            console.log(e)
        }
        finally {
            setShowLoader(false)
        }
    }

    return <Section className="signup-form gap-2 p-8 rounded-lg w-full sm:w-[500px]">
        <div className="form-header">
            <h1 className="text-3xl font-bold">Sign in</h1>
        </div>

        <div className="form-body w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">

                <div className="form-input w-full">

                    <label htmlFor="email" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                        Email:
                    </label>
                    <input
                        className="p-4 bg-gray-100 font-normal rounded-md w-full"
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Enter Name"
                    ></input>
                </div>

                <div className="form-input w-full">

                    <label htmlFor="password" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                        Password:
                    </label>
                    <input
                        className="p-4 bg-gray-100 font-normal rounded-md w-full"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Enter Password"
                    ></input>
                </div>

                <p className={`${err ? "bg-red-400" : ""} rounded-lg text-white test-lg font-semibold mt-4 p-2 w-full text-center`}>{err}</p>
                <button className="border border-black p-4 rounded-xl bg-black text-white w-48 mt-4 flex flex-row items-center justify-center gap-4">Sign in {showLoader ? <Loader fullPage={false} /> : ""}</button>
            </form>

        </div>
        <div className="form-footer mt-2">
            <span>Already registered?
                <span onClick={() => { navigate('/signup') }} className="underline cursor-pointer font-semibold">
                    Sign up
                </span>
            </span>
        </div>
    </Section>
}