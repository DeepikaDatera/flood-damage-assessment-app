import H1Title from "../components/ui/H1Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import SubTitle from "../components/ui/SubTitle";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const handleStartAssessment = () => {
        navigate('/dashboard');
    }
    return (
        <div className="bg-bgBlue w-full min-h-screen flex  items-center justify-center">
            <div className="flex flex-col items-center">
                <H1Title>FloodAssess</H1Title>
                <SubTitle>Flood damage assessment tool for</SubTitle>
                <SubTitle>chicken farms · Field data collection</SubTitle>
                <PrimaryButton className={"mt-4"} onClick={handleStartAssessment}>Start Assessment</PrimaryButton>
            </div>
        </div>
    )
}
