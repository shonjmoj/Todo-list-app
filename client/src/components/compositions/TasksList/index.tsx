import { useFetch } from "@/hooks";
import { axiosinstance, globalContext } from "@/lib/contants";
import { TaskData, TaskProps } from "@/lib/types";
import { useContext, useEffect } from "react";
import Task from "../Task";

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
      const { data: updatedTask } = await axiosinstance.post<TaskProps>(
        "/updatetask",
        taskData
      );
      setTasks((prev) =>
        prev?.map((task) =>
          task.id === updatedTask.id
            ? {
                ...task,
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
              }
            : task
        )
      );
    } catch (error) {
      console.error(error);
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
    <section className="max-h-[500px] flex flex-col gap-3 md:gap-5 items-center w-full overflow-auto">
      {!tasks?.length ? (
        <h1 className="italic text-2xl xl:text-3xl opacity-50 text-center mt-24">
          No tasks available...
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
