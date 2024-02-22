import { ChatBox } from "../components/ChatBox";
import { ChatMenu } from "../components/ChatMenu";
import { FindUsers } from "../components/FindUsers";
import { Section } from "../wrappers/Section";

export function Dashboard() {


    return (
        <Section override={true} className={"container border border-black"}>
            <div className="flex flex-row gap-4 items-stretch justify-between">
                <div className="flex flex-col gap-4 bg-slate-700 rounded-xl">
                    <FindUsers></FindUsers>
                    <ChatMenu></ChatMenu>
                </div>
                <div className="flex-auto border-l-2 border-r-2 border-black">
                    <ChatBox></ChatBox>
                </div>
            </div>
        </Section>
    )
}
