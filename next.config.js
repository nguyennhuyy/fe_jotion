const withPWA = require("next-pwa")({
	dest: "public",
	skipWaiting: true,
	register: true,
	cacheOnFrontEndNav: true,
	reloadOnOnline: true,
	disable: process.env.NODE_ENV === "development"
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "*"
			},
			{
				protocol: "https",
				hostname: "*"
			}
		]
	}
};

module.exports = withPWA(nextConfig);
