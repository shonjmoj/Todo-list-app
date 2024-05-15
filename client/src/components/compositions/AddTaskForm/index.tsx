import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";

const AddTaskForm = () => {
  return (
    <form className=" w-full md:w-[70%] xl:w-[50%] flex flex-col justify-between gap-2 sm:gap-4">
      <Input
        type="text"
        label="Task title"
        placeholder="New task ?"
        className="flex-1"
      />
      <Input
        type="textarea"
        label="Task description"
        placeholder="Description..."
        className="flex-1"
      />
      <Button
        type="button"
        text="Add task"
        className="border-slate-900 bg-slate-900 text-slate-300"
      />
    </form>
  );
};

export default AddTaskForm;
