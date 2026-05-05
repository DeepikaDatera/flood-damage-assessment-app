import { createAssessment } from "../server/assessment.js";
import { deleteAssessment, getAllAssessments, getPhotosByLocalId } from "./index.js"


export const syncPendingAssessments = async () => {
    const pending = await getAllAssessments()
    if (pending.length === 0) return;
    for (const assessment of pending) {
        try {
            const formData = new FormData();
            formData.append('localId', assessment.localId);
            formData.append('address', assessment.address);
            formData.append('farmCondition', assessment.farmCondition);
            formData.append('totalChicken', assessment.totalChicken);
            formData.append('farmName', assessment.farmName);
            formData.append('notes', assessment.notes);
            formData.append('assessorEmail', assessment.assessorEmail);
            formData.append('lat', assessment.lat);
            formData.append('lng', assessment.lng);
            const photos = await getPhotosByLocalId(assessment.localId);
            photos.forEach((photo) => {
                formData.append('photos', photo.file, photo.file.name);
            })

            const res = await createAssessment({ body: formData });
            if (res.success) {
                await deleteAssessment(assessment.localId);
            }
        } catch (err) {
            console.error("Error preparing form data for assessment", assessment.localId, err);

        }
    }
}