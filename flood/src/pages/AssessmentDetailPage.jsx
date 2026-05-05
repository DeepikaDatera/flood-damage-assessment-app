import { useEffect, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import ParagraphText from "../components/ui/ParagraphText";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAssessment } from "../server/assessment";
import ParagraphBoldText from "../components/ui/ParagraphBoldText";
import H1Title from "../components/ui/H1Title";
import ChickenIcon from "../assets/svg/ChickenIcon";
import OutlineButton from "../components/ui/OutlineButton";

const DetailField = ({ title, content }) => {
    return <div className="flex text-sm p-2 w-full">
        <div className="text-subTitleClr w-1/2 break-all">
            {title}
        </div>
        <div className="text-white w-1/2 break-all">
            {content}
        </div>
    </div>
}

export default function AssessmentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [assessmentData, setAssessmentData] = useState({})

    const handleEdit = () => {
        navigate(`/edit-assessment/${id}`)
    }

    const conditionClass =
        assessmentData.farmCondition === "Good"
            ? "bg-greenBorderClr border-greenBorderClr text-greenTextClr "
            : assessmentData.farmCondition === "Moderate"
                ? "bg-yellowBorderClr border-yellowBorderClr text-yellowTextClr "
                : "bg-redBorderClr border-redBorderClr text-redTextClr border-s-redTextClr"
    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchAssessment = async () => {
            try {
                const res = await getSingleAssessment(id);
                const data = res?.data;
                if (!data) return;
                let existingFiles = []
                if (data.firmPhotos?.length > 0) {
                    existingFiles = data.firmPhotos.map((photo) => ({
                        uid: photo._id,
                        name: photo.filename,
                        status: "done",
                        url: `${import.meta.env.VITE_API_URL}/${photo.path.replace(/\\/g, "/")}`,
                    }));
                }
                setAssessmentData({
                    address: data.address || "",
                    farmCondition: data.farmCondition || "Good",
                    totalChicken: data.totalChicken || "",
                    farmName: data.farmName || "",
                    notes: data.notes || "",
                    assessorEmail: data.assessorEmail || "",
                    images: [],
                    firmPhotos: existingFiles || [],
                    lat: data.lat,
                    lng: data.lng
                });
            } catch (error) {
                console.error("Error fetching assessment:", error);
            }
        };

        fetchAssessment();
    }, [id]);

    return (
        <div>
            <PageTitle title={"Assessment Detail"} subtitle={"View complete information for this farm assessment"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 p-6 gap-6">
                <div className="flex justify-end col-span-1 sm:col-span-2">
                    <OutlineButton className={"sm:max-w-fit"} onClick={handleEdit}>Update Assessment</OutlineButton>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-fieldClr p-4 rounded-lg">
                        <ParagraphText className={"text-white!"}>GPS Coordinates</ParagraphText>
                        <div className="flex w-full gap-4">
                            <div className="w-full border border-gray-700 p-3 rounded-lg">
                                <ParagraphText className="text-sm">Latitude</ParagraphText>
                                <ParagraphBoldText>{Number(assessmentData?.lat).toFixed(6)}</ParagraphBoldText>
                            </div>
                            <div className="w-full border border-gray-700 p-3 rounded-lg">
                                <ParagraphText className="text-sm">Longitude</ParagraphText>
                                <ParagraphBoldText>{Number(assessmentData.lng).toFixed(6)}</ParagraphBoldText>
                            </div>
                        </div>
                    </div>
                    <div className="bg-fieldClr p-4 rounded-lg
                    ">
                        <ParagraphText className={"text-white!"}>Farm Information</ParagraphText>
                        <div className="border border-gray-700 divide-y w-full divide-gray-700 mt-4 rounded-lg">
                            <DetailField title={"Farm Name"} content={assessmentData?.farmName} />
                            <DetailField title={"Farm Address"} content={assessmentData.address} />

                        </div>
                    </div>
                    <div className="bg-fieldClr p-4 rounded-lg
                    ">
                        <DetailField title={<ParagraphText className={"text-white"}>Farm Condition</ParagraphText>} content={<div className={`border rounded-md py-0.5 px-1.5 max-w-fit sm:py-1 sm:px-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap ${conditionClass}`}>
                            {assessmentData?.farmCondition}
                        </div>} />
                    </div>
                    <div className="bg-fieldClr p-4 rounded-lg
                    ">
                        <ParagraphText className={"text-white!"}>Notes</ParagraphText>
                        <div className="border border-gray-700 text-subTitleClr break-all  divide-y w-full min-h-25 p-4 divide-gray-700 mt-4 rounded-lg">
                            {assessmentData.notes}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="bg-fieldClr flex border border-gray-700 p-4 rounded-lg items-center gap-6">
                        <div className="w-25 h-25 border border-gray-700 rounded-2xl  flex justify-center items-center">
                            <ChickenIcon />
                        </div>
                        <div className="flex flex-col gap-2">
                            <ParagraphText>Total Chicken</ParagraphText>
                            <H1Title >{assessmentData?.totalChicken}</H1Title>
                        </div>
                    </div>
                    <div className="bg-fieldClr flex flex-col gap-4 border border-gray-700 p-4 rounded-lg">
                        <ParagraphText className={"text-white!"}>Photos</ParagraphText>
                        <div className="flex flex-wrap gap-4">
                            {
                                assessmentData?.firmPhotos?.length > 0 ? assessmentData?.firmPhotos.map(item =>
                                    <img className="w-25 h-25 rounded-lg" src={item.url} alt={item.url} />
                                ) :
                                    <div className="text-subTitleClr text-center">No photos found</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
