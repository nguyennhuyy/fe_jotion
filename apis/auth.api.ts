import { api } from "@/lib";
import {
	LoginGoogleType,
	LoginResponse,
	LoginType,
	RegisterType
} from "@/types";

export const loginApi = async (body: LoginType): Promise<LoginResponse> => {
	const data = await api.post("/auth/login", body);
	return data.data;
};
export const signUpApi = async (body: RegisterType): Promise<LoginResponse> => {
	const data = await api.post("/auth/register", body);
	return data.data;
};

export const loginGoogleApi = async (
	body: LoginGoogleType
): Promise<LoginResponse> => {
	const data = await api.post("/auth/login-google", body);
	return data.data;
};
