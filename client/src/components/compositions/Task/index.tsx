import Button from "@/components/atoms/button";
import { TaskProps } from "@/lib/types";
import { FC, useState } from "react";

const Task: FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const nothingToSave = !taskTitle || !taskDescription;

  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="w-full md:w-[70%] xl:w-[50%] flex items-center justify-between p-3 md:p-4 text-slate-800 border border-slate-900 rounded-lg shadow-lg">
      <div className="flex flex-col justify-start gap-1 xl:gap-4">
        {editMode ? (
          <>
            <input
              onChange={handleTaskTitleChange}
              defaultValue={title}
              type="text"
              className="border border-slate-900 rounded-md p-1 outline-none bg-transparent"
            />
            <textarea
              onChange={handleTaskDescriptionChange}
              defaultValue={description}
              className="border border-slate-900 rounded-md p-1 outline-none bg-transparent resize-none"
            />
          </>
        ) : (
          <>
            <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
            <p className="opacity-80">{description}</p>
          </>
        )}
      </div>
      <div className="space-x-2">
        <Button
          className={`${
            status === "pending"
              ? "border-yellow-600 bg-yellow-600"
              : "border-green-600 bg-green-600"
          } rounded-lg text-xs 2xl:text-sm font-semibold text-slate-300`}
          text={status}
          onClick={() =>
            updateTask({
              id: id!,
              title: title!,
              description: description!,
              status: status === "pending" ? "completed" : "pending",
            })
          }
        />
        <Button
          disabled={nothingToSave}
          text={editMode ? "Save" : "Edit"}
          className={` text-slate-300
            ${
              editMode
                ? "border-blue-600 bg-blue-600"
                : "border-slate-900 bg-slate-900"
            }
          `}
          onClick={() => {
            if (editMode) {
              updateTask({
                id: id!,
                title: taskTitle,
                description: taskDescription,
                status,
              });
            }
            setEditMode((prev) => !prev);
          }}
        />
        <Button
          text="Delete"
          onClick={() => deleteTask(id!)}
          className="border-red-600 bg-red-600 text-slate-300"
        />
      </div>
    </div>
  );
};

export default Task;
