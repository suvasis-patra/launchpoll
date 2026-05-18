import { AxiosError } from "axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { logoutUser } from "../api/auth";

interface ErrorResponse {
  message: string;
}

export const useLogout = (
  options?: UseMutationOptions<void, AxiosError<ErrorResponse>, void>,
) => {
  return useMutation({
    mutationFn: logoutUser,

    onError: (error) => {
      console.error(error.response?.data?.message ?? "Something went wrong");
    },

    ...options,
  });
};
