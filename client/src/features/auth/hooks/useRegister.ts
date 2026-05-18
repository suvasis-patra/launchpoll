import { AxiosError } from "axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { loginUser, registerUser } from "../api/auth";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

interface ErrorResponse {
  message: string;
}

export const useRegister = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<ErrorResponse>,
    {
      username: string;
      email: string;
      password: string;
    }
  >,
) => {
  return useMutation({
    mutationFn: registerUser,

    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error.response?.data?.message || "Something went wrong");
    },

    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginPayload
  >,
) => {
  return useMutation({
    mutationFn: loginUser,

    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error.response?.data?.message || "Something went wrong");
    },

    ...options,
  });
};
