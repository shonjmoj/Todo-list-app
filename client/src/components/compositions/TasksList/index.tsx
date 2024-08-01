import { useFetch } from "@/hooks";
import { axiosinstance, globalContext } from "@/lib/contants";
import { TaskData, TaskProps } from "@/lib/types";
import { useContext, useEffect } from "react";
import Task from "../Task";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const TasksList = () => {
  const { tasks, setTasks } = useContext(globalContext);
  const { data, isLoading } = useFetch<TaskProps[]>("/tasks");

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  const updateTask = async (taskData: TaskData) => {
    try {
      const { data: updatedTask, status } = await axiosinstance.post<TaskProps>(
        "/updatetask",
        taskData
      );
      if (status === 200) {
        toast.success("Task updated !");
      }
      setTasks((prev) =>
        prev?.map((task) =>
          task.id === updatedTask.id
            ? {
                ...task,
                ...updatedTask,
              }
            : task
        )
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { data: deletedTask } = await axiosinstance.post<TaskProps>(
        "/deletetask",
        { id }
      );
      setTasks((prev) => prev?.filter((task) => task.id !== deletedTask.id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className="container max-h-[500px] flex flex-col gap-3 md:gap-5 items-center overflow-auto">
      {!tasks?.length ? (
        <h1 className="text-2xl xl:text-3xl opacity-50 text-center mt-24">
          Nothing to do...
        </h1>
      ) : (
        tasks?.map((task) => (
          <Task
            key={task.id}
            {...task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))
      )}
    </section>
  );
};

export default TasksList;
