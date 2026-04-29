import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const createAssessment = async (req) => {
    const response = await axios.post(`${apiUrl}/api/assessment/create-assessment`, req.body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const getAssessments = async () => {
    const response = await axios.get(`${apiUrl}/api/assessment/get-assessments`)
    return response.data
}