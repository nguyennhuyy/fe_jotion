"use client";
import Cookies from "js-cookie";

type useCookieType = {
	getItemCookie: (key: string) => string | undefined;
	setItemCookie: (key: string, data: string) => string | undefined;
	removeItemCookie: (key: string) => void;
};
const useCookie = (): useCookieType => {
	const getItemCookie = (key: string) => Cookies.get(key);
	const setItemCookie = (key: string, data: string) => Cookies.set(key, data);
	const removeItemCookie = (key: string) => Cookies.remove(key);
	return {
		getItemCookie,
		setItemCookie,
		removeItemCookie
	};
};

export default useCookie;
