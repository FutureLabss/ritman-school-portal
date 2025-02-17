import { AxiosResponse } from "axios";

export const getErrorMessage = (response: AxiosResponse): string => {
  if (response?.data?.errors) {
    const errors = response.data.errors;
    const errorMessages = Object.values(errors).flat();
    return errorMessages.join(" ");
  }
  return response?.data?.message || "An unknown error occurred.";
};
