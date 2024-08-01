import AddTaskForm from "./components/compositions/AddTaskForm";

import TasksList from "./components/compositions/TasksList";
import Header from "./components/compositions/header";
import "./index.css";

function App() {
  return (
    <main className="container h-screen flex flex-col justify-center gap-5 lg:gap-7 items-center p-2 sm:p-4">
      <Header />
      <h1 className="font-semibold text-2xl lg:text-4xl">
        What are we doing today?
      </h1>
      <AddTaskForm />
      <TasksList />
    </main>
  );
}

export default App;
