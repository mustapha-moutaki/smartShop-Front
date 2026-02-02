import { apiClient } from "../../lib/ApiClient"

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/login", credentials);
    const data = response.data;

    if (!data || !data.token) {
      return {
        success: false,
        error:
          "Données de connexion invalides. Veuillez vérifier votre adresse e-mail et votre mot de passe.",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        "Une erreur est survenue lors de la connexion.",
    };
  }
};
