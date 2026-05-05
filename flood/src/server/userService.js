import axios from "axios"
import { toast } from "react-toastify"
import axiosInstance from "../api/axiosInstance";

const apiUrl = import.meta.env.VITE_API_URL

export const createUser = async (values) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/register`, values);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
};

export const loginUser = async (value) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/login`, value)
        sessionStorage.setItem("userEmail", value.email)

        sessionStorage.setItem("token", response?.data?.token)
        toast.success(response?.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

export const getUser = async (value) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/api/user/get-user`, value)
        sessionStorage.setItem("userEmail", response?.data?.data)
        return response.data
    } catch (error) {
        console.log(error.response?.data?.message)
    }

}
