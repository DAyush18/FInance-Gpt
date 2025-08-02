"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface NavigationLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
	prefetch?: boolean;
	replace?: boolean;
	scroll?: boolean;
	target?: string;
	rel?: string;
}

export function NavigationLink({
	href,
	children,
	className,
	onClick,
	...linkProps
}: NavigationLinkProps) {
	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		// Add a subtle loading state to the clicked element
		const target = e.currentTarget;
		target.style.opacity = "0.7";
		target.style.transform = "scale(0.98)";

		// Reset after navigation
		setTimeout(() => {
			target.style.opacity = "";
			target.style.transform = "";
		}, 300);

		// Call custom onClick if provided
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<Link
			href={href}
			className={`cursor-pointer ${className || ""}`}
			onClick={handleClick}
			style={{ transition: "opacity 0.2s ease, transform 0.2s ease" }}
			{...linkProps}
		>
			{children}
		</Link>
	);
}

// Loading Button component for navigation actions
interface NavigationButtonProps {
	onClick: () => void;
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

export function NavigationButton({
	onClick,
	children,
	className = "",
	disabled = false,
	isLoading = false,
}: NavigationButtonProps) {
	const handleClick = () => {
		if (!disabled && !isLoading) {
			onClick();
		}
	};

	return (
		<motion.button
			onClick={handleClick}
			disabled={disabled || isLoading}
			className={`${className} transition-all duration-200`}
			whileTap={{ scale: 0.95 }}
			style={{
				opacity: disabled || isLoading ? 0.6 : 1,
				cursor: disabled || isLoading ? "not-allowed" : "pointer",
			}}
		>
			{isLoading ? (
				<div className="flex items-center gap-2">
					<motion.div
						className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					/>
					Loading...
				</div>
			) : (
				children
			)}
		</motion.button>
	);
}

export default NavigationLink;
