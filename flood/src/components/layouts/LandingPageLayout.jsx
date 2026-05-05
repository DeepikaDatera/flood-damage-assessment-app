import { Outlet } from "react-router-dom";
import EyesIcon from "../../assets/svg/EyesIcon";
import { H2Title } from "../ui/CustomText";

const features = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        title: "GPS-enabled site capture",
        subtitle: "Auto lat/long with address lookup",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
                <path d="M8 2v16M16 6v16" />
            </svg>
        ),
        title: "Offline-first data collection",
        subtitle: "Works without internet in the field",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
        title: "Auto-sync on reconnect",
        subtitle: "Guest data claimed on login",
    },
];
export default function LandingPageLayout() {
    return (
        <div className="min-h-screen bg-bgBlue flex items-center justify-center p-6 sm:py-2">
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="max-w-325 w-full grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-6 col-span-1 justify-center w-full  shrink-0 p-0 md:p-12 border-r border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="bg-fieldClr rounded-2xl p-2 sm:p-4 border border-buttonClr ">
                            <EyesIcon />
                        </div>
                        <H2Title>FloodAssess</H2Title>
                    </div>

                    <div className="inline-flex w-fit items-center bg-fieldClr border border-subTitleClr rounded-full px-3 py-1">
                        <span className="text-[#00e5ff] text-[10px] font-semibold tracking-[1.5px]">MADISON COUNTY · NC</span>
                    </div>

                    <h1 className="text-white text-3xl font-bold leading-tight tracking-tight hidden sm:block">
                        Flood Damage<br />Assessment Portal
                    </h1>
                    <p className="text-[#5a7fa0] text-sm leading-relaxed max-w-[260px] hidden sm:block">
                        Digitize field data collection for chicken farms across Madison County following recent floods.
                    </p>
                    <div className=" flex-col gap-3 hidden sm:flex">
                        {features.map((f, i) => (
                            <div key={i}
                                className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3">
                                <div
                                    className="w-9 h-9 rounded-lg bg-[#00e5ff]/8 border border-[#00e5ff]/15 flex items-center justify-center shrink-0">
                                    {f.icon}
                                </div>
                                <div>
                                    <p className="text-white text-[13px] font-medium leading-none mb-1">{f.title}</p>
                                    <p className="text-[#3d5a73] text-[11px]">{f.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full col-span-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
