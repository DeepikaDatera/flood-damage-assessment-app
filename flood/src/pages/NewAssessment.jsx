import { useEffect, useState } from "react";
import ParagraphText from "../components/ui/ParagraphText";
import ParagraphBoldText from "../components/ui/ParagraphBoldText";
import OutlineButton from "../components/ui/OutlineButton";
import { Radio } from "antd";
import UploadImage from "../components/form/UploadImage";
import PrimaryButton from "../components/ui/PrimaryButton";
import { saveAssessment, savePhoto } from "../db";
import { syncPendingAssessments } from "../db/sync";
import PageTitle from "../components/ui/PageTitle";

export default function NewAssessment() {
    const [fileList, setFileList] = useState([]);
    const [coords, setCoords] = useState();
    const [errorText, setErrorText] = useState(false);
    const [loading, setLoading] = useState(false);
    const [assessmentData, setAssessmentData] = useState({
        address: "",
        farmCondition: "Good",
        totalChicken: "",
        farmName: "",
        notes: "",
        assessorName: "",
        images: [],
    });
    const handleGetLocation = () => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);

                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error("Error getting location:", error)
            );
        }
    }
    const options = [
        { label: 'Good', value: 'Good' },
        { label: 'Moderate', value: 'Moderate' },
        { label: 'Bad', value: 'Bad' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssessmentData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateAssessment = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!assessmentData.address || !assessmentData.farmCondition || !assessmentData.totalChicken || !assessmentData.assessorName) {
            setErrorText(true);
            setLoading(false);
            return;
        }
        try {
            const localId = Date.now().toString();
            await saveAssessment(
                {
                    localId,
                    address: assessmentData.address,
                    farmCondition: assessmentData.farmCondition,
                    totalChicken: assessmentData.totalChicken,
                    notes: assessmentData.notes,
                    farmName: assessmentData.farmName,
                    assessorName: assessmentData.assessorName,
                    lat: coords.lat,
                    lng: coords.lng,
                }
            )
            if (assessmentData.images.length > 0) {
                await savePhoto(localId, assessmentData.images);
            }
            if (navigator.onLine) {
                await syncPendingAssessments();
            }
            setLoading(false);
            alert('Assessment saved successfully!');
            setAssessmentData({
                address: "",
                farmCondition: "Good",
                totalChicken: "",
                farmName: "",
                notes: "",
                assessorName: "",
                images: [],
            });
            setFileList([]);
        } catch (error) {
            setLoading(false);
            console.error("Error creating assessment:", error);
        }
    }

    useEffect(() => {
        handleGetLocation();
    }, []);
    console.log(coords);

    return (
        <div>
            <PageTitle title={"New Assessment"} subtitle={"Fill all fields · saved locally until sync"} />
            {
                navigator.onLine ? null :
                    <div className="p-4 pb-0">
                        <div
                            className={`flex items-center w-fit gap-2 px-3 py-2 rounded-md border text-sm sm:text-base 
      border-yellowBorderClr text-yellowTextClr`}
                        >
                            <div className={`w-2 h-2 rounded-full
       bg-yellowTextClr`}
                            />
                            <span className="text-[10px]">
                                You are currently offline. The assessment will be saved locally and synced when you are back online
                            </span>
                        </div>
                    </div>
            }

            <form className="flex gap-6 p-4 flex-wrap sm:flex-nowrap" onSubmit={handleCreateAssessment}>
                <div className="w-full flex flex-col gap-6">
                    {
                        coords?.lat && coords?.lng ?
                            <>
                                <ParagraphText>GPS Coordinates</ParagraphText>
                                <div className="flex w-full gap-4">
                                    <div className="w-full bg-fieldClr p-3 rounded-lg">
                                        <ParagraphText className={'text-sm'}>Latitude</ParagraphText>
                                        <ParagraphBoldText>{coords.lat.toFixed(6)}</ParagraphBoldText>
                                    </div>
                                    <div className="w-full bg-fieldClr p-3 rounded-lg">
                                        <ParagraphText className={'text-sm'}>Longitude</ParagraphText>
                                        <ParagraphBoldText>{coords.lng.toFixed(6)}</ParagraphBoldText>
                                    </div>
                                </div>
                                <OutlineButton onClick={handleGetLocation}>Re-Capture GPS Location</OutlineButton>
                                {
                                    errorText && (!coords.lat || !coords.lng) && <p className={"text-red-500 text-sm"}>GPS Location is required. Wait for location to be captured.</p>
                                }
                            </> : <ParagraphText>Getting GPS Location...</ParagraphText>}
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Farm Name *</label>
                        <input name="farmName" value={assessmentData.farmName} onChange={handleInputChange} className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr" placeholder="Enter Farm Name" />
                        {
                            errorText && !assessmentData?.farmName && <p className={"text-red-500 text-sm"}>Farm Name is required</p>
                        }
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Address *</label>
                        <input name="address" value={assessmentData.address} onChange={handleInputChange} className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr" placeholder="Enter Address" />
                        {
                            errorText && !assessmentData?.address && <p className={"text-red-500 text-sm"}>Address is required</p>
                        }
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Farm Conditions *</label>
                        <Radio.Group className="text-amber-50" options={options} name="farmCondition" value={assessmentData?.farmCondition} onChange={handleInputChange} />
                        {
                            errorText && !assessmentData?.farmCondition && <p className={"text-red-500 text-sm"}>Farm Condition is required</p>
                        }
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Total Chicken *</label>
                        <input name="totalChicken" value={assessmentData.totalChicken} onChange={handleInputChange} className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr" placeholder="Enter Total Chicken" />
                        {
                            errorText && !assessmentData?.totalChicken && <p className={"text-red-500 text-sm"}>Total Chicken is required</p>
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Upload Images</label>
                        <UploadImage setAssessmentData={setAssessmentData} fileList={fileList} setFileList={setFileList} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Notes (Optional)</label>
                        <textarea name="notes" value={assessmentData.notes} onChange={handleInputChange} rows={4} className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr" placeholder="Enter Note" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Assessor Name *</label>
                        <input name="assessorName" value={assessmentData.assessorName} onChange={handleInputChange} className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr" placeholder="Enter Your Name" />
                        {
                            errorText && !assessmentData?.assessorName && <p className={"text-red-500 text-sm"}>Assessor Name is required</p>
                        }
                    </div>
                    <PrimaryButton className={"sm:mt-4"} isLoading={loading}>Save Assessment</PrimaryButton>
                </div>
            </form >
        </div >
    )
}
