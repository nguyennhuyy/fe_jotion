import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-black/10 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-0",
					className,
					error &&
						"focus-visible:ring-[rgb(240,68,56)]/30 border-[rgb(240,68,56)]"
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
