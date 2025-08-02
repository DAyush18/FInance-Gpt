"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useRipple } from "@/hooks/useRipple";

interface RippleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
	children: React.ReactNode;
	rippleColor?: string;
	disableRipple?: boolean;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
	(
		{
			children,
			className = "",
			rippleColor = "rgba(255, 255, 255, 0.5)",
			disableRipple = false,
			onClick,
			...props
		},
		ref
	) => {
		const { rippleRef, createRipple } = useRipple();

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (!disableRipple) {
				createRipple(event);
			}
			if (onClick) {
				onClick(event);
			}
		};

		return (
			<motion.button
				ref={ref}
				className={`relative overflow-hidden cursor-pointer ${className}`}
				onClick={handleClick}
				whileTap={{ scale: 0.98 }}
				transition={{ duration: 0.1 }}
				{...props}
			>
				{children}
				<div
					ref={rippleRef}
					className="absolute inset-0 pointer-events-none"
					style={{ "--ripple-color": rippleColor } as React.CSSProperties}
				/>
			</motion.button>
		);
	}
);

RippleButton.displayName = "RippleButton";
