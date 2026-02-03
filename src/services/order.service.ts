import apiClient from "../../lib/ApiClient"
import type { CreateOrderPayload } from "../types/order";
// Base
const ORDER_BASE = "/orders"


// get all orders
export const getOrders = async ()=>{
    const response = await apiClient.get(ORDER_BASE);
    console.log("this is the response sevice: ", response);
    return response.data
}

// get by id
export const getOrderById = async(id: number) =>{
    const response = await apiClient.get(`${ORDER_BASE}/${id}`);
    return response.data;
}


// create order
export const createOrder = async(payload: CreateOrderPayload)=>{
    const response =  await apiClient.post(ORDER_BASE, payload);
    return response.data;
}

// update order
export const updateOrder =  async(id: number, payload: any)=>{
    const response =  await apiClient.put(`${ORDER_BASE}/${id}`, payload);
    return response.data;
}

// delete order
export const deleteOrder = async(id: number)=>{
    const response = await apiClient.delete(`${ORDER_BASE}/${id}`);
    return response.data
}


export const CancelOrder = async(id: number)=>{
    // const response = await apiClient.
}

export const ConfirmOrder = async(id: number)=>{
    const response = await apiClient.post(`${ORDER_BASE}/${id}/confirm`);
    return response.data;
}


export const ShowClientHistoryById = async(clientId: number)=>{
    const response = await apiClient.get(`/my-history/${clientId}`);
    return response.data;
}