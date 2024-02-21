import { useNavigate } from "react-router-dom";
import { Section } from "../wrappers/Section";

export function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Section>
            <h1 className="font-bold text-3xl">Unauthorized</h1>
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="border border-black bg-black text-white text-lg font-semibold p-2 px-4 rounded-md" onClick={goBack}>Go Back</button>
            </div>
        </Section>
    )
}