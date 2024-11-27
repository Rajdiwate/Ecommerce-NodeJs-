import { axiosInstance } from "../utils/axios";

export const getAllOrders=async()=>{
    try{
    const {data}=await axiosInstance.get('/admin/orders');
    console.log(data)
    return data;
    }catch (error) {
        console.error("Get users error:", error.response?.data || error.message);
        throw error; 
    }
}