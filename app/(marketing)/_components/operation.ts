import { useQuery } from "@tanstack/react-query";

import { TypeQuery } from ".";
import { userInfoApi } from "@/apis";

export const useGetInfoQuery = () =>
	useQuery({
		queryKey: [TypeQuery.GetUserInfo],
		queryFn: userInfoApi
	});
