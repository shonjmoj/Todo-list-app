import { ButtonProps } from "@/lib/types";
import { FC } from "react";

const Button: FC<ButtonProps> = ({ className, text, ...restOfProps }) => {
  return (
    <button
      className={`border px-4 py-2 rounded outline-none ${className}`}
      {...restOfProps}
    >
      {text}
    </button>
  );
};

export default Button;
