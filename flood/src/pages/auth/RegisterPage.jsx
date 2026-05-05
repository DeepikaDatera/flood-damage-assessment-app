import { H2Title } from "../../components/ui/CustomText";
import ParagraphText from "../../components/ui/ParagraphText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlineButton from "../../components/ui/OutlineButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeCloseIcon from "../../assets/svg/EyeCloseIcon";
import { createUser } from "../../server/userService";
import EyepassowrdIcon from "../../assets/svg/EyepassowrdIcon";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "password" || name === "confirmPassword") {
            setPasswordMismatch(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorText(false);
        setPasswordMismatch(false);
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setErrorText(true);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        setLoading(true);
        try {
            const response = await createUser(formData)
            if (response.success) {
                navigate("/");
            }
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center p-0 pt-4 md:p-12 h-full">
            <div className="mb-4">
                <H2Title className="text-white text-2xl font-bold tracking-tight mb-1.5">Create Account</H2Title>
                <p className="text-subTitleClr text-sm">Register to manage and sync your assessments</p>
            </div>

            {!navigator.onLine && (
                <div className="pb-4">
                    <div className="flex items-center w-fit gap-2 px-3 py-2 rounded-md border text-sm border-yellowBorderClr text-yellowTextClr">
                        <div className="w-2 h-2 rounded-full bg-yellowTextClr" />
                        <span className="text-[10px]">
                            You are offline. Please connect to the internet to create an account.
                        </span>
                    </div>
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleRegister}>

                <div className="flex flex-col gap-1">
                    <label className="text-subTitleClr">Email Address *</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="py-2 px-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                        placeholder="Enter Email Address"
                    />
                    {errorText && !formData.email && (
                        <p className="text-red-500 text-sm">Email is required</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-subTitleClr">Password *</label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full py-2 px-4 pr-12 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? (
                                <EyepassowrdIcon />
                            ) : (
                                <EyeCloseIcon />
                            )}
                        </button>
                    </div>
                    {errorText && !formData.password && (
                        <p className="text-red-500 text-sm">Password is required</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-subTitleClr">Confirm Password *</label>
                    <div className="relative">
                        <input
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full py-2 px-4 pr-12 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Re-enter Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showConfirm ? (
                                <EyepassowrdIcon />
                            ) : (
                                <EyeCloseIcon />
                            )}
                        </button>
                    </div>
                    {errorText && !formData.confirmPassword && (
                        <p className="text-red-500 text-sm">Please confirm your password</p>
                    )}
                    {passwordMismatch && (
                        <p className="text-red-500 text-sm">Passwords do not match</p>
                    )}
                </div>

                <PrimaryButton isLoading={loading}>Create Account</PrimaryButton>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <ParagraphText className="text-xs">or</ParagraphText>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <OutlineButton type="button" onClick={() => navigate("/dashboard")}>
                    Continue as Guest
                </OutlineButton>

                <p className="text-center text-sm text-subTitleClr">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-buttonClr cursor-pointer font-medium hover:underline"
                    >
                        Sign in
                    </button>
                </p>

            </form>
        </div>
    );
}