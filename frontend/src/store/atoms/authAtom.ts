import { atom } from "recoil";

export const accessTokenAtom = atom({
    key: "accessTokenAtom",
    default: null as string | null
})