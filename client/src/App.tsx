import AddTaskForm from "./components/compositions/AddTaskForm";
import Task from "./components/compositions/AddTaskForm/Task";
import "./index.css";

function App() {
  return (
    <main className="container flex flex-col justify-center gap-3 md:gap-5 items-center p-2 sm:p-4">
      <AddTaskForm />
      <Task title="test" description="test etstet" status="pending" />
      <Task title="test" description="test etstet" status="completed" />
    </main>
  );
}

export default App;
