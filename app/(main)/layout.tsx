"use client";
import React from "react";
import { redirect } from "next/navigation";

import SearchCommand from "@/components/search-command";

import { Navigation } from "./_components";
import useCookie from "@/hooks/use-cookie";
import { KeyCookie } from "@/lib";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { getItemCookie } = useCookie();
	const token = getItemCookie(KeyCookie.Token);

	console.log("token", token);
	if (!token) {
		return redirect("/");
	}

	return (
		<div className='h-full flex dark:bg-[#1F1F1F]'>
			<Navigation />
			<main className='flex-1 h-full overflow-y-auto'>
				<SearchCommand />
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
