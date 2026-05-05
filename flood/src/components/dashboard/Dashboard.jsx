import { useEffect, useState } from "react";
import { getAssessments } from "../../server/assessment";
import ParagraphText from "../../components/ui/ParagraphText";
import ParagraphBoldText from "../../components/ui/ParagraphBoldText";
import AssessmentPieChart from "./AssessmentPieChart";
import InfoIcon from "../../assets/svg/InfoIcon";
import RecentActivity from "./RecentActivity";
import CustomSkeleton from "../ui/CustomSkeleton";

const StatusCard = ({ title, count, color }) => {
    return (
        <div className={`col-span-1 bg-fieldClr rounded-lg p-2 sm:p-4`} >
            <ParagraphText className={`text-sm! ${color} `}>{title}</ParagraphText>
            <ParagraphBoldText className={`font-bold text-lg sm:text-3xl ${color} `}>{count}</ParagraphBoldText>
        </div>
    )
}

export default function Dashboard({ status }) {
    const [isLoading, setIsLoading] = useState(false);
    const [assessments, setAssessments] = useState();
    const isOnline = navigator.onLine;

    useEffect(() => {
        const getAllAssessments = async () => {
            setIsLoading(true);
            try {
                const data = await getAssessments(status);
                setAssessments(data?.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setIsLoading(false); // ✅ always runs
            }
        };
        if (navigator.onLine) {
            getAllAssessments();
        }
    }, []);

    return (
        <>
            {
                isOnline ? <CustomSkeleton isLoading={isLoading}>
                    <div className="py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatusCard title={"Count"} count={assessments?.counts?.total ?? 0} />
                            <StatusCard title={"Good"} count={assessments?.counts?.good ?? 0} color={"text-greenTextClr!"} />
                            <StatusCard title={"Moderate"} count={assessments?.counts?.moderate ?? 0} color={"text-yellowTextClr!"} />
                            <StatusCard title={"Bad"} count={assessments?.counts?.bad ?? 0} color={"text-redTextClr!"} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4">
                            <div className="col-span-1 flex flex-col gap-4">
                                <ParagraphText>Recent Assessments</ParagraphText>
                                <RecentActivity status={status} assessmentData={assessments?.recentAssessments} />
                            </div>
                            <div className="col-span-1 flex flex-col gap-4">
                                <ParagraphText>Site Map</ParagraphText>
                                <AssessmentPieChart counts={assessments?.counts} />
                            </div>
                        </div>
                    </div>
                </CustomSkeleton> :
                    <div className="p-4 flex justify-center items-center mt-24">
                        <div className="w-full max-w-175 flex items-start gap-3 bg-fieldClr border border-gray-700 rounded-lg p-4">

                            <div className="mt-0.5 text-blue-400 text-lg">
                                <InfoIcon />
                            </div>

                            <div className="text-left">
                                <p className="text-sm font-semibold text-white">
                                    Dashboard Unavailable Offline
                                </p>
                                <p className="text-xs text-subTitleClr mt-1">
                                    You are currently offline. Please connect to the internet to view and access the latest dashboard data.
                                </p>
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}
