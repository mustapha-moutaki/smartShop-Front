import apiClient from "../../lib/ApiClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await apiClient.post("/login", credentials);
  return response.data;
};
