import apiClient from "../../lib/ApiClient"
import type { PaymentRequest } from "../types/payment";

const PAYMENT_BASE = "/payments";

export const getAllPayments = async() => {
    const response = await apiClient.get(PAYMENT_BASE);
    return response?.data;
}

export const getPaymentById = async (id: number) => {
    const response = await apiClient.get(`${PAYMENT_BASE}/${id}`);
    return response?.data;
}

export const createPayment = async (payload: PaymentRequest) => {
    const response = await apiClient.post(PAYMENT_BASE, payload);
    return response?.data;
}

export const updatePayment = async (id: number, payload: PaymentRequest) => {
    const response = await apiClient.put(`${PAYMENT_BASE}/${id}`, payload);
    return response?.data;
}

export const deletePayment = async (id: number) => {
    const response = await apiClient.delete(`${PAYMENT_BASE}/${id}`);
    return response?.data;
}

