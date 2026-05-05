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
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAssessment, updateAssessment } from "../server/assessment";

export default function NewAssessment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const userEmail = sessionStorage.getItem("userEmail");

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
        assessorEmail: "",
        images: [],
        firmPhotos: [],
    });

    const options = [
        { label: "Good", value: "Good" },
        { label: "Moderate", value: "Moderate" },
        { label: "Bad", value: "Bad" },
    ];

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }),
                (error) => console.error("Error getting location:", error)
            );
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssessmentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const assessorEmail = assessmentData.assessorEmail || userEmail;

        if (
            !assessmentData.address ||
            !assessmentData.farmCondition ||
            !assessmentData.totalChicken ||
            !assessmentData.farmName ||
            !assessorEmail
        ) {
            setErrorText(true);
            setLoading(false);
            return;
        }

        try {
            if (id) {
                await updateAssessment(
                    id,
                    {
                        address: assessmentData.address,
                        farmCondition: assessmentData.farmCondition,
                        totalChicken: assessmentData.totalChicken,
                        notes: assessmentData.notes,
                        farmName: assessmentData.farmName,
                        assessorEmail,
                        lat: coords?.lat,
                        lng: coords?.lng,
                    },
                    fileList
                );
                toast.success("Assessment updated successfully!");
                navigate(-1);
            } else {
                const localId = Date.now().toString();
                await saveAssessment({
                    localId,
                    address: assessmentData.address,
                    farmCondition: assessmentData.farmCondition,
                    totalChicken: assessmentData.totalChicken,
                    notes: assessmentData.notes,
                    farmName: assessmentData.farmName,
                    assessorEmail,
                    lat: coords?.lat,
                    lng: coords?.lng,
                });

                if (assessmentData.images.length > 0) {
                    await savePhoto(localId, assessmentData.images);
                }
                if (navigator.onLine) {
                    await syncPendingAssessments();
                }

                toast.success("Assessment saved successfully!");
                setAssessmentData({
                    address: "",
                    farmCondition: "Good",
                    totalChicken: "",
                    farmName: "",
                    notes: "",
                    assessorEmail: "",
                    images: [],
                    firmPhotos: [],
                });
                setFileList([]);
            }
        } catch (error) {
            console.error("Error submitting assessment:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setErrorText(false);
        }
    };

    useEffect(() => {
        if (!id) {
            handleGetLocation();
            return;
        }

        const fetchAssessment = async () => {
            try {
                const res = await getSingleAssessment(id);
                const data = res?.data;
                if (!data) return;

                setAssessmentData({
                    address: data.address || "",
                    farmCondition: data.farmCondition || "Good",
                    totalChicken: data.totalChicken || "",
                    farmName: data.farmName || "",
                    notes: data.notes || "",
                    assessorEmail: data.assessorEmail || "",
                    images: [],
                    firmPhotos: data.firmPhotos || [],
                });

                if (data.firmPhotos?.length > 0) {
                    const existingFiles = data.firmPhotos.map((photo) => ({
                        uid: photo._id,
                        name: photo.filename,
                        status: "done",
                        url: `${import.meta.env.VITE_API_URL}/${photo.path.replace(/\\/g, "/")}`,
                    }));
                    setFileList(existingFiles);
                }

                if (data.lat && data.lng) {
                    setCoords({ lat: data.lat, lng: data.lng });
                }
            } catch (error) {
                console.error("Error fetching assessment:", error);
                toast.error("Failed to load assessment.");
            }
        };

        fetchAssessment();
    }, [id]);

    return (
        <div>
            <PageTitle
                title={id ? "Edit Assessment" : "New Assessment"}
                subtitle={"Fill all fields · saved locally until sync"}
            />

            {!navigator.onLine && (
                <div className="p-4 pb-0">
                    <div className="flex items-center w-fit gap-2 px-3 py-2 rounded-md border border-yellowBorderClr text-yellowTextClr">
                        <div className="w-2 h-2 rounded-full bg-yellowTextClr" />
                        <span className="text-[10px]">
                            You are currently offline. The assessment will be saved locally and synced when you are back online
                        </span>
                    </div>
                </div>
            )}

            <form className="gap-6 p-4 grid grid-cols-2" onSubmit={handleSubmit}>
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-6">

                    {coords?.lat && coords?.lng ? (
                        <div className="flex flex-col gap-4">
                            <ParagraphText>GPS Coordinates</ParagraphText>
                            <div className="flex w-full gap-4">
                                <div className="w-full bg-fieldClr p-3 rounded-lg">
                                    <ParagraphText className="text-sm">Latitude</ParagraphText>
                                    <ParagraphBoldText>{Number(coords.lat).toFixed(6)}</ParagraphBoldText>
                                </div>
                                <div className="w-full bg-fieldClr p-3 rounded-lg">
                                    <ParagraphText className="text-sm">Longitude</ParagraphText>
                                    <ParagraphBoldText>{Number(coords.lng).toFixed(6)}</ParagraphBoldText>
                                </div>
                            </div>
                            <OutlineButton type="button" onClick={handleGetLocation}>
                                Re-Capture GPS Location
                            </OutlineButton>
                        </div>
                    ) : (
                        <ParagraphText>Getting GPS Location...</ParagraphText>
                    )}
                    {!token && (
                        <div className="flex flex-col gap-3">
                            <label className="text-subTitleClr">
                                Assessor Email *
                            </label>
                            <input
                                name="assessorEmail"
                                type="email"
                                value={assessmentData.assessorEmail}
                                onChange={handleInputChange}
                                className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                                placeholder="Enter Your Email"
                            />
                            {errorText && !assessmentData.assessorEmail && (
                                <p className="text-red-500 text-sm">Assessor Email is required</p>
                            )}
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Farm Name *</label>
                        <input
                            name="farmName"
                            value={assessmentData.farmName}
                            onChange={handleInputChange}
                            className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Farm Name"
                        />
                        {errorText && !assessmentData.farmName && (
                            <p className="text-red-500 text-sm">Farm Name is required</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Address *</label>
                        <input
                            name="address"
                            value={assessmentData.address}
                            onChange={handleInputChange}
                            className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Address"
                        />
                        {errorText && !assessmentData.address && (
                            <p className="text-red-500 text-sm">Address is required</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Farm Conditions *</label>
                        <Radio.Group
                            options={options}
                            name="farmCondition"
                            value={assessmentData.farmCondition}
                            onChange={handleInputChange}
                        />
                        {errorText && !assessmentData.farmCondition && (
                            <p className="text-red-500 text-sm">Farm Condition is required</p>
                        )}
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Total Chicken *</label>
                        <input
                            name="totalChicken"
                            type="number"
                            value={assessmentData.totalChicken}
                            onChange={handleInputChange}
                            className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Total Chicken"
                        />
                        {errorText && !assessmentData.totalChicken && (
                            <p className="text-red-500 text-sm">Total Chicken is required</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">
                            {id ? "Photos" : "Upload Images"}
                        </label>
                        <UploadImage
                            setAssessmentData={setAssessmentData}
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-subTitleClr">Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={assessmentData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            className="p-4 bg-fieldClr rounded-lg placeholder:text-gray-500 focus-visible:outline-none text-inputClr"
                            placeholder="Enter Note"
                        />
                    </div>
                    {!token && (
                        <PrimaryButton className="sm:mt-4" isLoading={loading}>
                            {id ? "Update Assessment" : "Save Assessment"}
                        </PrimaryButton>
                    )}
                </div>
                {token && (
                    <div className="col-span-2 flex justify-center gap-3">
                        {id && (
                            <OutlineButton className="sm:mt-4 sm:max-w-50" onClick={() => navigate(-1)}>
                                Cancel
                            </OutlineButton>
                        )}
                        <PrimaryButton className="sm:mt-4 sm:max-w-50" isLoading={loading}>
                            {id ? "Update Assessment" : "Save Assessment"}
                        </PrimaryButton>
                    </div>
                )}
            </form>
        </div>
    );
}