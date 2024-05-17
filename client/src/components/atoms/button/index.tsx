import { ButtonProps } from "@/lib/types";
import { FC } from "react";

const Button: FC<ButtonProps> = ({ className, text, ...restOfProps }) => {
  return (
    <button
      className={`border p-1 text-sm md:px-3 md:py-2 lg:text-base rounded outline-none ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...restOfProps}
    >
      {text}
    </button>
  );
};

export default Button;
