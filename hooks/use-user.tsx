"use client";
import { useQuery } from "@tanstack/react-query";

import { userInfoApi } from "@/apis";
import { userStore } from "@/store";
import { useEffect } from "react";

const useUser = () => {
	const { setUser } = userStore();
	const args = useQuery({
		queryKey: ["GetUserInfo"],
		queryFn: userInfoApi
	});

	useEffect(() => {
		if (args?.data) {
			setUser(args?.data);
		}
	}, [args.data]);
	return {
		...args
	};
};

export default useUser;
