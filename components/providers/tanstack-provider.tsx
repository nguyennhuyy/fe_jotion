"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const TanstackProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	});
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default TanstackProvider;
