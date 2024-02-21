import { useEffect, useState } from "react";
import { Info } from "../assets/Info";
import { CONSTANTS } from "../../config/Constants"
import { Correct } from "../assets/Correct";
import { Incorrect } from "../assets/Incorrect";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/Constants";
import { useSetCurrentSession } from "../hooks/useSetCurrentSession";
import { defaultUser } from "../../config/defaults";
import { Section } from "../wrappers/Section";

export function Signup() {

    const [email, setEmail] = useState("")
    const [validName, setValidName] = useState(false)

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)

    const [confirmPWD, setConfirmPWD] = useState("")
    const [validconfirmPWD, setValidconfirmPWD] = useState(false)

    const [err, setErr] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const navigate = useNavigate()
    const setCurrentSession = useSetCurrentSession()

    useEffect(() => {
        setErr("")
        setValidName(CONSTANTS.EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErr("")
        setValidPassword(CONSTANTS.PWD_REGEX.test(password));
        setValidconfirmPWD(password == confirmPWD)
    }, [password, confirmPWD])

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (!CONSTANTS.EMAIL_REGEX.test(email)) {
            setErr('Email does not match format')
            return setValidName(CONSTANTS.EMAIL_REGEX.test(email));
        }
        if (!CONSTANTS.PWD_REGEX.test(password)) {
            setErr('Password does not match format')
            return setValidPassword(CONSTANTS.PWD_REGEX.test(password));
        }
        if (password != confirmPWD) {
            setErr('Passwords do not match')
            return setValidconfirmPWD(password == confirmPWD)
        }
        setShowLoader(true)
        try {
            const response = await customAxios.post(CONSTANTS.AUTH.SIGNUP, { firstname, lastname, email, password }, { withCredentials: true })

            const { accessToken, ...user } = response.data.user
            setCurrentSession({ accessToken, userData: user })
            navigate('/')

        } catch (e: any) {
            setCurrentSession({ accessToken: "", userData: defaultUser })

            setErr(e.response.data.message)
            console.log(e)
        }
        finally {
            setShowLoader(false)
        }
    }

    return <Section className="signup-form gap-2 p-8 rounded-lg w-full sm:w-[500px]">
        <div className="form-header">
            <h1 className="text-3xl font-bold">Sign up</h1>
        </div>
        <div className="form-body w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="form-input w-full flex flex-row items-center justify-between gap-4">
                    <div className="form-input w-full">
                        <label htmlFor="firstname" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Firstname:
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="text"
                            id="firstname"
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                            placeholder="Enter Firstname"
                        ></input>
                    </div>
                    <div className="form-input w-full">
                        <label htmlFor="lastname" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Lastname:
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="text"
                            id="lastname"
                            autoComplete="off"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                            placeholder="Enter Lastname"
                        ></input>
                    </div>
                </div>
                <div className="form-input w-full">

                    <label htmlFor="email" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                        Email:
                        {!email ? "" : !validName ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                    </label>
                    <input
                        className="p-4 bg-gray-100 font-normal rounded-md w-full"
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        placeholder="Enter email"
                    ></input>
                    <p id="uidnote" className={`${email && !validName ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                        <Info />
                        Incorrect Format
                    </p>
                </div>
                <div className="form-input w-full">

                    <label htmlFor="password" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                        Password:
                        {!password ? "" : !validPassword ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                    </label>
                    <input
                        className="p-4 bg-gray-100 font-normal rounded-md w-full"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        placeholder="Enter password"
                    ></input>
                    <p id="pwdnote" className={`${password && !validPassword ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                        <Info />
                        8 to 24 characters.
                        Must include uppercase and lowercase letters, a number and a special character.
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="form-input w-full">

                    <label htmlFor="confirmPWD" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                        Confirm Password:
                        {!confirmPWD ? "" : !validconfirmPWD ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                    </label>
                    <input
                        className="p-4 bg-gray-100 font-normal rounded-md w-full"
                        type="password"
                        id="confirmPWD"
                        onChange={(e) => setConfirmPWD(e.target.value)}
                        value={confirmPWD}
                        required
                        aria-invalid={validconfirmPWD ? "false" : "true"}
                        aria-describedby="confirmpwdnote"
                        placeholder="Enter password again"
                    ></input>
                    <p id="confirmpwdnote" className={`${confirmPWD && !validconfirmPWD ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                        <Info />
                        Must match the first password input field.
                    </p>
                </div>
                <p className={`${err ? "bg-red-400" : ""} rounded-lg text-white test-lg font-semibold mt-4 p-2 w-full text-center`}>{err}</p>
                <button className="border border-black p-4 rounded-xl bg-black text-white w-48 mt-4 flex flex-row items-center justify-center gap-4">Sign up {showLoader ? <Loader fullPage={false} /> : ""}</button>
            </form>

        </div>
        <div className="form-footer mt-2">
            <span>Already registered? <span onClick={() => { navigate('/signin') }} className="underline cursor-pointer font-semibold">Sign in</span></span>
        </div>
    </Section>
}