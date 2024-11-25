import {axiosInstance} from "../utils/axios"


export const getAllProducts = async function (args = {}) {
    try {
        const { page, gte, lte, keyword } = args;

        // Build query string dynamically
        const queryParams = new URLSearchParams();

        if (page) queryParams.append("page", page);
        if (gte) queryParams.append("price[gte]", gte);
        if (lte) queryParams.append("price[lte]", lte);
        if (keyword) queryParams.append("keyword", keyword);

        // Send GET request with query parameters
        const { data } = await axiosInstance.get(`/product?${queryParams.toString()}`);
        return data;
    } catch (error) {
        console.error("Get products error:", error.response?.data || error.message);
    }
};


export const getSingleProduct = async function(productId){
    try {
        const {data} = await axiosInstance.get(`/product/${productId}`)
        console.log("product : " , data)
        return data
    } catch (error) {
        console.log("Get single Product error:" , error.response.data)
        return error.response.data
    }
}
