import apiClient from "../../lib/ApiClient";

export interface LoginCredentials {
  username: string;
  password: string;
}


export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    
    //  Get the data
    const userData = response.data; 

    //  Store user info (Role/Username) for the UI
    localStorage.setItem('user', JSON.stringify(userData));

    console.log("Logged in as:", userData.role);
    
    // 3. Redirect user based on role but not her we gonna redirect him via login component using naviagete()

    return userData; 
    
  } catch (error) {
    console.error("Login Error:", error);
    throw error; 
  }
};