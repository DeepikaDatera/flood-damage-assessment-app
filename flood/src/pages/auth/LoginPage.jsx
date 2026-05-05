import { H2Title } from "../../components/ui/CustomText";
import ParagraphText from "../../components/ui/ParagraphText";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlineButton from "../../components/ui/OutlineButton"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../server/userService";
export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorText(false);
        if (!formData.email || !formData.password) {
            setErrorText(true);
            return;
        }
        setLoading(true);
        try {
            const response = await loginUser(formData)
            if (response.success) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex-1 flex flex-col justify-center p-0 pt-4 md:p-12">
            <div className="mb-4">
                <H2Title className="text-white text-2xl font-bold tracking-tight mb-1.5">Welcome Back</H2Title>
                <p className="text-subTitleClr text-sm">Sign in to access your assessments</p>
            </div>
            {!navigator.onLine && (
                <div className="px-4 pb-2">
                    <div className="flex items-center w-fit gap-2 px-3 py-2 rounded-md border text-sm border-yellowBorderClr text-yellowTextClr">
                        <div className="w-2 h-2 rounded-full bg-yellowTextClr" />
                        <span className="text-[10px]">
                            You are offline. Cached credentials will be used to sign you in.
                        </span>
                    </div>
                </div>
            )}

            <form className="flex flex-col gap-6 " onSubmit={handleLogin}>
                <div className="flex flex-col gap-3">
                    <label className="text-subTitleClr">Email Address *</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 px-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                        placeholder="Enter Email Address"
                    />
                    {errorText && !formData.email && (
                        <p className="text-red-500 text-sm">Email is required</p>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-subTitleClr">Password *</label>
                    </div>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 px-4 pr-12 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errorText && !formData.password && (
                        <p className="text-red-500 text-sm">Password is required</p>
                    )}
                </div>

                <PrimaryButton isLoading={loading}>Sign In</PrimaryButton>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <ParagraphText className="text-xs">or</ParagraphText>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <OutlineButton type="button" onClick={() => navigate("/dashboard")}>
                    Continue as Guest
                </OutlineButton>

                <p className="text-center text-sm text-subTitleClr">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-buttonClr cursor-pointer font-medium hover:underline"
                    >
                        Create one
                    </button>
                </p>

            </form>
        </div>
    )
}
