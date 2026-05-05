import { useNavigate } from "react-router-dom"
import EditIcon from "../../assets/svg/EditIcon"
import EyepassowrdIcon from "../../assets/svg/EyepassowrdIcon"

const RecentActivityCard = ({ farmName, address, farmCondition, date, id, status }) => {
    const navigate = useNavigate()

    const conditionClass =
        farmCondition === "Good"
            ? "bg-greenBorderClr border-greenBorderClr text-greenTextClr border-s-greenTextClr"
            : farmCondition === "Moderate"
                ? "bg-yellowBorderClr border-yellowBorderClr text-yellowTextClr border-s-yellowTextClr"
                : "bg-redBorderClr border-redBorderClr text-redTextClr border-s-redTextClr"

    return (
        <div className={`flex w-full justify-between bg-fieldClr! p-3 sm:p-4 border-s-2 gap-2 ${conditionClass}`}>
            <div className="flex flex-col justify-center min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-bold text-inputClr mb-1 truncate">
                    {farmName}
                </div>
                <div className="text-[10px] sm:text-xs text-subTitleClr truncate">
                    {address}
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="flex flex-col items-end gap-1">
                    <div className={`border rounded-md py-0.5 px-1.5 sm:py-1 sm:px-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap ${conditionClass}`}>
                        {farmCondition}
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-subTitleClr whitespace-nowrap">
                        {new Date(date ?? null).toLocaleDateString()}
                    </span>
                </div>

                {status === "mine" && (
                    <div className="flex flex-col gap-2 border-gray-700 border-s ">
                        <div
                            className="ps-3 cursor-pointer h-full flex items-center "
                            onClick={() => navigate(`/view-assessment/${id}`)}
                        >
                            <EyepassowrdIcon className="w-4 h-4  text-subTitleClr  hover:text-inputClr transition-colors" />
                        </div>
                        <div
                            className="ps-3 cursor-pointer h-full flex items-center "
                            onClick={() => navigate(`/edit-assessment/${id}`)}
                        >
                            <EditIcon className="w-4 h-4 text-subTitleClr hover:text-inputClr transition-colors" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function RecentActivity({ assessmentData, status }) {
    return (
        <>
            {assessmentData?.length > 0 ? assessmentData?.map((assessment) => (
                <RecentActivityCard
                    key={assessment?.localId ?? assessment?._id}
                    farmName={assessment.farmName}
                    address={assessment.address}
                    farmCondition={assessment.farmCondition}
                    date={assessment.createdAt}
                    status={status}
                    id={assessment?.localId ?? assessment?._id}
                />
            )) : <div className="w-full border border-gray-700 rounded-lg p-4 text-center h-full flex items-center justify-center bg-fieldClr text-subTitleClr text-base"> No recent activity</div>
            }
        </>
    )
}