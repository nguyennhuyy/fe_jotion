import { ReactNode, createContext, useState } from "react";

type AuthContextType = {
	toggleAuth?: boolean;
	openDialog?: boolean;
	handleToggleAuth?: () => void;
	handleOpenDialog?: () => void;
};
export const AuthContext = createContext<AuthContextType>({});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [toggleAuth, setToggleAuth] = useState<boolean>(true);
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const handleToggleAuth = () => setToggleAuth(!toggleAuth);
	const handleOpenDialog = () => setOpenDialog(!openDialog);

	return (
		<AuthContext.Provider
			value={{ toggleAuth, openDialog, handleToggleAuth, handleOpenDialog }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
