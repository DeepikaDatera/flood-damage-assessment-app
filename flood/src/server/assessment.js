import axiosInstance from "../api/axiosInstance"

const apiUrl = import.meta.env.VITE_API_URL

export const createAssessment = async (req) => {
    const response = await axiosInstance.post(`${apiUrl}/api/assessment/create-assessment`, req.body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const getAssessments = async (status) => {

    try {
        const response = await axiosInstance.get(`${apiUrl}/api/assessment/get-assessments?status=${status}`)
        return response.data
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}

export const getSingleAssessment = async (id) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/api/assessment/get-single-assessment?id=${id}`)
        return response.data
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}


export const updateAssessment = async (id, value, fileList = []) => {
    try {
        const formData = new FormData();
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
                formData.append(key, val);
            }
        });
        const existingPhotoIds = fileList
            .filter((f) => !f.originFileObj && f.uid)
            .map((f) => f.uid);
        formData.append("existingPhotoIds", JSON.stringify(existingPhotoIds));
        fileList
            .filter((f) => f.originFileObj)
            .forEach((f) => {
                formData.append("photos", f.originFileObj, f.name);
            });

        const response = await axiosInstance.put(
            `/api/assessment/update-assessment/${id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message);
    }
};