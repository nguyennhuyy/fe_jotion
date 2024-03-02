"use client";

import React from "react";
import { useRouter } from "next/navigation";

import SearchCommand from "@/components/search-command";

import { Navigation } from "./_components";
import { KeyCookie } from "@/lib";
import { useCookie, useUser } from "@/hooks";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { getItemCookie } = useCookie();

	useUser();
	const router = useRouter();
	const token = getItemCookie(KeyCookie.Token);

	if (typeof window !== "undefined" && !token) {
		return router.push("/");
	}

	return (
		<div className='h-full flex dark:bg-[#1F1F1F]'>
			<Navigation />
			<main className='flex-1 h-full overflow-y-auto'>
				<SearchCommand disableCmd />
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
