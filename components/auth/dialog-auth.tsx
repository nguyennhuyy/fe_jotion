import React, { useContext } from "react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "../ui";

import { Login, SignUp } from ".";
import { AuthContext } from "./context";

type DialogAuthType = React.HTMLAttributes<HTMLDivElement> & {
	mode?: "Login" | "SignUp";
};
const DialogAuth = ({ mode = "Login", ...props }: DialogAuthType) => {
	const { toggleAuth, openDialog, handleOpenDialog } = useContext(AuthContext);

	return (
		<Dialog open={openDialog} onOpenChange={handleOpenDialog} {...props}>
			{mode === "Login" ? (
				<Button variant='ghost' onClick={handleOpenDialog}>
					Đăng nhập
				</Button>
			) : (
				<Button size='sm' onClick={handleOpenDialog}>
					Đăng ký miễn phí
				</Button>
			)}
			<DialogContent className='px-8 pt-[38px] pb-12'>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold text-black'>
						{toggleAuth ? "Đăng nhập" : "Đăng ký"}
						<p className='text-base text-black/60 font-normal mt-1'>
							để tiếp tục với ứng dụng Jotion
						</p>
					</DialogTitle>
					{toggleAuth ? <Login /> : <SignUp />}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DialogAuth;
