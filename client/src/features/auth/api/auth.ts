import { api } from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";
import {
  type RegisterResponse,
  type RegisterPayload,
  type LoginPayload,
  type LoginResponse,
} from "../types/auth.types";

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post<RegisterResponse>(
    ENDPOINTS.AUTH.REGISTER,
    payload,
  );

  return response.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};
