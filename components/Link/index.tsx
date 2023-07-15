import React, { ReactNode } from "react";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface LinkProps {
    activeClassName?: string;
    className?: string;
    href: string;
    children: ReactNode;
    onClick?: () => void;
}

export default function Link({ href, className, activeClassName, children, onClick }: LinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <NextLink
            className={twMerge(
                `flex flex-row items-center text-lg gap-3 rounded-md px-3 py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`,
                isActive && activeClassName,
                className
            )}
            href={href}
            onClick={onClick}
        >
            {children}
        </NextLink>
    );
}
