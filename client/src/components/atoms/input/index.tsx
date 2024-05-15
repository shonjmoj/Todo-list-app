import { InputProps } from "@/lib/types";
import { FC } from "react";

const Input: FC<InputProps> = ({ className, label, type, ...restOfProps }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          className={`border border-slate-800 px-4 py-2 bg-transparent rounded outline-none`}
          {...restOfProps}
        />
      ) : (
        <input
          className={`border border-slate-800 px-4 py-2 bg-transparent rounded outline-none`}
          {...restOfProps}
        />
      )}
    </div>
  );
};

export default Input;
