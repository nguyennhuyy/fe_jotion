"use client";

import { useState, useEffect } from "react";

const useScrollTop = (threshold = 10) => {
	const [scrolled, setScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () =>
			window.scrollY > threshold ? setScrolled(true) : setScrolled(false);

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);

	return scrolled;
};

export default useScrollTop;
