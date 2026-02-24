import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./components/context/DarkModeContext";

const filters = ["all", "active", "completed"];
export type FilterValue = (typeof filters)[number];

function App() {
  const [filter, setFilter] = useState<FilterValue>(filters[0]);
  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
