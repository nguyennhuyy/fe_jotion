import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import {
	ConvexClientProvider,
	ThemeProvider,
	TanstackProvider
} from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/logo.svg",
				href: "/logo.svg"
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logo-dark.svg",
				href: "/logo-dark.svg"
			}
		]
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<TanstackProvider>
					<ConvexClientProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
							storageKey='jotion-theme-2'>
							<Toaster position='bottom-center' />
							{children}
						</ThemeProvider>
					</ConvexClientProvider>
				</TanstackProvider>
			</body>
		</html>
	);
}
