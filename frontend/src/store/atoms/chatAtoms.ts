import { atom } from "recoil";

export const chatterAtom = atom({
    key: "chatterAtom",
    default: {
        sender: "",
        reciever: ""
    }
})