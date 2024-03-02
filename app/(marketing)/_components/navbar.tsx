"use client";
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useCookie, useScrollTop } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { Logo } from ".";
import { MainDialogAuth } from "@/components/auth";
import { KeyCookie } from "@/lib";

const Navbar = () => {
	const scrolled = useScrollTop();
	const { getItemCookie } = useCookie();
	const token = getItemCookie(KeyCookie.Token);
	return (
		<div
			className={cn(
				"z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
				scrolled && "border-b shadow-sm"
			)}>
			<Logo />

			<div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
				{!token && (
					<>
						<MainDialogAuth />
						<MainDialogAuth mode='SignUp' />
					</>
				)}
				{token && (
					<>
						<Button variant='ghost' size='sm' asChild>
							<Link href='/documents'>Vào Jotion</Link>
						</Button>
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	);
};

export default Navbar;
