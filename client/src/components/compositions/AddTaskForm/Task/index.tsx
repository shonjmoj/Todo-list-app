import Button from "@/components/atoms/button";
import { TaskProps } from "@/lib/types";
import { FC } from "react";

const Task: FC<TaskProps> = ({ title, description, status }) => {
  return (
    <div className="mt-6 w-full md:w-[70%] xl:w-[50%] flex items-center justify-between p-3 md:p-4 text-slate-800 border border-slate-900 rounded-lg">
      <div className="space-y-2">
        <Button
          className={`${
            status === "pending"
              ? "border-yellow-600 bg-yellow-600"
              : "border-green-600 bg-green-600"
          } rounded-full text-xs xl:text-sm font-semibold text-slate-300`}
          text={status}
        />

        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        <p className="opacity-80">{description}</p>
      </div>
      <div className="space-x-2">
        <Button
          text="Edit"
          className="border-slate-900 bg-slate-900 text-slate-300"
        />
        <Button
          text="Delete"
          className="border-red-600 bg-red-600 text-slate-300"
        />
      </div>
    </div>
  );
};

export default Task;
