import { useEffect, useState } from "react";
import { getAssessments } from "../server/assessment";
import ParagraphText from "../components/ui/ParagraphText";
import ParagraphBoldText from "../components/ui/ParagraphBoldText";
import PageTitle from "../components/ui/PageTitle";
import AssessmentPieChart from "../components/dashboard/AssessmentPieChart";
import { Skeleton } from "antd";
import InfoIcon from "../assets/svg/InfoIcon";

const StatusCard = ({ title, count, color }) => {
    return (
        <div className={`col-span-1 bg-fieldClr rounded-lg p-2 sm:p-4`} >
            <ParagraphText className={`text-sm! ${color} `}>{title}</ParagraphText>
            <ParagraphBoldText className={`font-bold text-lg sm:text-3xl ${color} `}>{count}</ParagraphBoldText>
        </div>
    )
}

const RecentActivityCard = ({ farmName, address, farmCondition, date }) => {
    return (
        <div className={`flex w-full justify-between bg-fieldClr  p-4 border-s-2 ${farmCondition === "Good" ? "border-s-greenTextClr" : farmCondition === "Moderate" ? "border-s-yellowTextClr" : "border-s-redTextClr"} `}>
            <div>
                <div className="text-xs font-bold text-inputClr mb-2">{farmName}</div>
                <div className="text-xs text-subTitleClr" >{address}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className={` ${farmCondition === "Good" ? "bg-greenBorderClr border border-greenBorderClr text-greenTextClr" : farmCondition === "Moderate" ? "bg-yellowBorderClr border border-yellowBorderClr text-yellowTextClr" : "bg-redBorderClr border border-redBorderClr text-redTextClr"} rounded-md py-1 px-2 text-xs font-semibold`}>{farmCondition}</div>
                <div className="flex items-center gap-1">
                    <span className="text-[10px] text-subTitleClr">{new Date(date ?? null).toLocaleDateString()}</span>
                </div>
            </div>

        </div>
    )
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [assessments, setAssessments] = useState();
    const isOnline = navigator.onLine;
    useEffect(() => {
        const getAllAssessments = async () => {
            setIsLoading(true);
            try {
                const data = await getAssessments();
                console.log("Fetched assessments:", data);
                setAssessments(data?.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getAllAssessments()
    }, [])

    return (
        <>
            <PageTitle title={"Assessment Dashboard"} subtitle={new Date().toDateString()} />
            {
                isOnline ? <Skeleton active loading={isLoading} paragraph={{ rows: 5 }} >
                    <div className="p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatusCard title={"Count"} count={assessments?.counts?.total ?? 0} />
                            <StatusCard title={"Good"} count={assessments?.counts?.good ?? 0} color={"text-greenTextClr!"} />
                            <StatusCard title={"Moderate"} count={assessments?.counts?.moderate ?? 0} color={"text-yellowTextClr!"} />
                            <StatusCard title={"Bad"} count={assessments?.counts?.bad ?? 0} color={"text-redTextClr!"} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4">
                            <div className="col-span-1 flex flex-col gap-4">
                                {
                                    assessments?.recentAssessments?.map((assessment, index) => (
                                        <RecentActivityCard
                                            key={index}
                                            farmName={assessment.farmName}
                                            address={assessment.address}
                                            farmCondition={assessment.farmCondition}
                                            date={assessment.createdAt}
                                        />
                                    ))
                                }
                            </div>
                            <div className="col-span-1">
                                <AssessmentPieChart counts={assessments?.counts} />
                            </div>
                        </div>
                    </div>
                </Skeleton> :
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
