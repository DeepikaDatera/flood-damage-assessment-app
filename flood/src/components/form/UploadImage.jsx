import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const { Dragger } = Upload;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = ({ setAssessmentData, fileList, setFileList }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        const updatedList = newFileList.map((file) => {
            if (file.originFileObj && !file.preview) {
                file.preview = URL.createObjectURL(file.originFileObj);
            }
            return file;
        });

        setFileList(updatedList);
        setAssessmentData((prev) => ({
            ...prev,
            images: updatedList.map((file) => file.originFileObj).filter(Boolean),
        }));
    };

    const handleRemove = (file) => {
        const updated = fileList.filter((f) => f.uid !== file.uid);
        setFileList(updated);
        setAssessmentData((prev) => ({
            ...prev,
            images: updated.map((f) => f.originFileObj).filter(Boolean),
        }));
        return false;
    };

    return (
        <>
            <Dragger
                multiple
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
                beforeUpload={() => false}
                showUploadList={false}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text text-inputClr!">
                    Click or drag images to upload
                </p>
            </Dragger>

            {fileList.length > 0 && (
                <div className="flex flex-col gap-2 mt-3">
                    {fileList.map((file) => {
                        const src =
                            file.url ||
                            file.thumbUrl ||
                            (file.originFileObj
                                ? URL.createObjectURL(file.originFileObj)
                                : null);

                        const isExisting = !file.originFileObj && file.url;

                        return (
                            <div
                                key={file.uid}
                                className="flex items-center gap-3 p-2 rounded-lg border border-borderBlue bg-bgSurface"
                            >
                                {src && (
                                    <img
                                        src={src}
                                        alt={file.name}
                                        className="w-10 h-10 object-cover rounded-md shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <span
                                        className="text-sm text-inputClr truncate cursor-pointer block"
                                        onClick={() => handlePreview(file)}
                                    >
                                        {file.name}
                                    </span>
                                    {isExisting && (
                                        <span className="text-[10px] text-[#5a7fa0]">
                                            Existing photo
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(file)}
                                    className="text-red-400 hover:text-red-500 text-xs shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {previewImage && (
                <Image
                    preview={{
                        open: previewOpen,
                        onOpenChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                    style={{ display: "none" }}
                />
            )}
        </>
    );
};

export default UploadImage;