import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { useContext, useState } from "react";
import { axiosinstance, globalContext } from "@/lib/contants";

const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { setTasks } = useContext(globalContext);

  const nothingToAdd = !taskTitle || !taskDescription;

  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const { data } = await axiosinstance.post("/addtask", {
        title: taskTitle,
        description: taskDescription,
      });
      setTasks((prev) => [data, ...prev!]);
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full md:w-[70%] xl:w-[50%] flex flex-col justify-between gap-3 sm:gap-5"
    >
      <Input
        type="text"
        label="Title"
        placeholder="New task ?"
        className="flex-1"
        onChange={handleTaskTitleChange}
      />
      <Input
        type="textarea"
        label="Description"
        placeholder="Description..."
        className="flex-1"
        onChange={handleTaskDescriptionChange}
      />
      <Button
        disabled={nothingToAdd}
        text="Add task"
        className="border-slate-900 bg-slate-900 text-slate-300"
      />
    </form>
  );
};

export default AddTaskForm;
