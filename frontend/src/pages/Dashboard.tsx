import { ChatBox } from "../components/ChatBox";
import { ChatMenu } from "../components/ChatMenu";
import { FindUsers } from "../components/FindUsers";

export function Dashboard() {


    return (
        <section className="bg-gray-50 dark:bg-gray-900 w-full h-full rounded-lg text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 ">
            <div className="flex flex-col md:flex-row gap-0 items-stretch justify-between rounded-lg">
                <div className="flex flex-col overflow-y-auto py-4 px-4 h-full bg-white rounded-lg md:rounded-none border-r-0 md:border-r-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 gap-4 rounded-bl-lg rounded-tl-lg w-full md:w-[360px]">
                    <FindUsers></FindUsers>
                    <ChatMenu></ChatMenu>
                </div>
                <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 gap-4  rounded-br-lg rounded-tr-lg h-[80vh]">
                    <ChatBox></ChatBox>
                </div>
            </div>
        </section>
    )
}
