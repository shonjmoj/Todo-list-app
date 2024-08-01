import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { useContext, useState } from "react";
import { axiosinstance, globalContext } from "@/lib/contants";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const AddTaskForm = () => {
  const { setTasks } = useContext(globalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const nothingToAdd = !taskTitle || !taskDescription;

  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const addTask = async () => {
    try {
      const { data, status } = await axiosinstance.post("/addtask", {
        title: taskTitle,
        description: taskDescription,
      });
      if (status === 201) toast.success("Task added !");
      setTasks((prev) => [data, ...prev!]);
      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full md:w-[70%] xl:w-[50%] flex flex-col justify-between gap-5 2xl:gap-7"
    >
      <Input
        value={taskTitle}
        type="text"
        label="Title"
        placeholder="New task ?"
        className="flex-1"
        onChange={handleTaskTitleChange}
      />
      <Input
        value={taskDescription}
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
