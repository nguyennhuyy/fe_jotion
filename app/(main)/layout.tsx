"use client";

import React from "react";
import { useRouter } from "next/navigation";

import SearchCommand from "@/components/search-command";

import { Navigation } from "./_components/documents";
import { KeyCookie } from "@/lib";
import { useCookie, useUser } from "@/hooks";
import { ModeToggle } from "@/components/mode-toggle";
import { Publish } from "@/components/publish";

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
				<div className='flex items-center justify-end px-7 py-1 sticky inset-0 z-50 bg-white shadow dark:bg-secondary gap-2'>
					<Publish />
					<SearchCommand disableCmd />
					<ModeToggle />
				</div>
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
