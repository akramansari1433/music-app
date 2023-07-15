import React, { HtmlHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    id: string;
    accessibleLabel: string;
    className?: string;
    children?: ReactNode; // Make children optional
    onClick?: () => void;
    icon?: ReactNode;
    iconPlacement?: "left" | "right";
}

const Button = ({
    id,
    accessibleLabel,
    className,
    children,
    onClick,
    icon,
    iconPlacement = "left",
    ...props
}: ButtonProps) => {
    return (
        <button
            id={id}
            aria-label={accessibleLabel}
            className={twMerge(
                `flex items-center justify-center py-2 px-4 rounded bg-black text-white dark:bg-white dark:text-black`,
                className
            )}
            onClick={onClick}
            {...props}
        >
            {icon && iconPlacement === "left" && (!children ? icon : <span className="mr-2">{icon}</span>)}
            {children}
            {icon && iconPlacement === "right" && (!children ? icon : <span className="ml-2">{icon}</span>)}
        </button>
    );
};

export default Button;
