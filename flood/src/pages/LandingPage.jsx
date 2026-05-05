import EyesIcon from "../assets/svg/EyesIcon";
import H1Title from "../components/ui/H1Title";
import OutlineButton from "../components/ui/OutlineButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import SubTitle from "../components/ui/SubTitle";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const handleStartAssessment = () => {
        navigate('/dashboard');
    }
    const handleRedirectLogin = () => {
        navigate('/login')
    }

    const handleRedirectRegister = () => {
        navigate('/register')
    }
    return (
        <div className="bg-bgBlue w-full min-h-screen flex  items-center justify-center">
            <div className="flex flex-col items-center">
                <span className="bg-fieldClr text-buttonClr px-4 py-1 rounded-2xl text-sm font-semibold border border-buttonClr">MADISON COUNTY · NC</span>
                <div className="bg-fieldClr rounded-2xl p-4 border border-buttonClr my-8">
                    <EyesIcon />
                </div>
                <H1Title>FloodAssess</H1Title>
                <SubTitle>Flood damage assessment tool for</SubTitle>
                <SubTitle>chicken farms · Field data collection</SubTitle>
                <PrimaryButton className={"mt-4"} onClick={handleRedirectLogin}>Login</PrimaryButton>
                <OutlineButton className={"mt-4 min-w-100"} onClick={handleRedirectRegister}>Create Account</OutlineButton>
                <div className="w-full flex items-center justify-center gap-3 my-5">
                    <div className="flex-1 h-[0.2px] bg-subTitleClr"></div>
                    <span className="text-subTitleClr">or</span>
                    <div className="flex-1 h-[0.2px] bg-subTitleClr" ></div>
                </div>
                <PrimaryButton onClick={handleStartAssessment}>Start Assessment as Guest</PrimaryButton>
            </div>
        </div>
    )
}
