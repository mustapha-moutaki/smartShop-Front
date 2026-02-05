import apiClient from "../../lib/ApiClient"


const PRODUCT_BASE = "/products";

export const getAllProducts = async()=>{
    const response = await apiClient.get(PRODUCT_BASE);
    return response?.data;
}

