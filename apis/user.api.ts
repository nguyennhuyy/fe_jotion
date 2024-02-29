import { api } from "@/lib";
import { UserInfoType } from "@/types";

export const userInfoApi = async (): Promise<UserInfoType> => {
	const data = await api.get<UserInfoType>("/users/info");
	return data.data;
};
