import { UserInfoType } from "@/types";
import { create } from "zustand";

type CoverImageStore = {
	user?: Partial<UserInfoType>;
	setUser: (user: UserInfoType) => void;
};

export const userStore = create<CoverImageStore>(set => ({
	user: undefined,
	setUser: (user: UserInfoType) => set({ user })
}));
