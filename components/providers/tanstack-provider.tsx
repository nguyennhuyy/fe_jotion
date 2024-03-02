"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
});

const TanstackProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default TanstackProvider;
