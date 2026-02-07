import apiClient from "../../lib/ApiClient"
import type { ProductRequest } from "../types/product";


const PRODUCT_BASE = "/products";

export const getAllProducts = async()=>{
    const response = await apiClient.get(PRODUCT_BASE);
    return response?.data;
}


export const deleteProduct = async(id: number)=>{
    const response = await apiClient.delete(`${PRODUCT_BASE}/${id}`);
    return response?.data;
}

export const updateProduct = async(id: number, payload:ProductRequest)=>{
    const response = await apiClient.put(`${PRODUCT_BASE}/${id}`, payload);
    return response?.data;
}

export const getProductById = async (id: number)=>{
    const response = await apiClient.get(`${PRODUCT_BASE}/${id}`);
    return response?.data
}