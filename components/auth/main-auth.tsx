import React from "react";

import { AuthContextProvider } from ".";
import DialogAuth from "./dialog-auth";

type MainAuthType = {
	mode?: "Login" | "SignUp";
};

const MainAuth = ({ mode = "Login" }: MainAuthType) => {
	return (
		<div>
			<AuthContextProvider>
				<DialogAuth mode={mode} />
			</AuthContextProvider>
		</div>
	);
};

export default MainAuth;
