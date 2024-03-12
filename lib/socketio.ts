import { io } from "socket.io-client";
import Cookies from "js-cookie";

import { KeyCookie } from ".";

export const socket = io(process.env.NEXT_PUBLIC_API ?? "", {
	auth: {
		authorization: `Bearer ${
			typeof window !== "undefined" && Cookies.get("token")
		}`
	}
});
