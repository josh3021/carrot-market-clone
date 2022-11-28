import Link from "next/link";
import React from "react";
import { cls } from "../libs/functions/classnames";

interface IFloatingButtonProps {
  href: string;
  children: React.ReactNode;
}

export const FloatingButton: React.FC<IFloatingButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Link href={href} className="floating-btn">
      {children}
    </Link>
  );
};

interface IFullButtonProps {
  text: string;
}

export const FullButton: React.FC<IFullButtonProps> = ({ text }) => {
  return <button className="full-btn">{text}</button>;
};

interface IButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export const Button = ({
  large = false,
  onClick,
  text,
  ...rest
}: IButtonProps) => {
  return (
    <button
      {...rest}
      className={cls(
        "w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm "
      )}
    >
      {text}
    </button>
  );
};
