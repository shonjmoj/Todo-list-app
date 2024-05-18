import AddTaskForm from "./components/compositions/AddTaskForm";

import TasksList from "./components/compositions/TasksList";
import Header from "./components/compositions/header";
import "./index.css";

function App() {
  return (
    <main className="container mt-32 md:mt-24 flex flex-col justify-start gap-4 lg:gap-6 items-center p-2 sm:p-4">
      <Header />
      <h1 className="font-semibold text-2xl lg:text-4xl">
        What are we doing today?
      </h1>
      <AddTaskForm />
      <h3 className="italic opacity-80">
        NB: Tasks list is scrollable in case of more than 4 tasks*
      </h3>
      <TasksList />
    </main>
  );
}

export default App;
