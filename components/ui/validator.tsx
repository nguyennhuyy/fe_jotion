"use client";
import React, { forwardRef } from "react";

import { cn } from "@/lib";

type ValidatorType = React.HTMLAttributes<HTMLParagraphElement> & {
	error: any;
};

const Validator = forwardRef<HTMLParagraphElement, ValidatorType>(
	({ className, error, ...props }: ValidatorType, ref) => {
		if (!error) return null;
		return (
			<p
				ref={ref}
				className={cn(
					"text-sm font-normal mt-2 text-[rgb(240,68,56)] leading-4 transition-all duration-300",
					className
				)}
				{...props}
			/>
		);
	}
);

Validator.displayName = "Validator";
export { Validator };
