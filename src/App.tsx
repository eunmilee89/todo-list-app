import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./components/context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <TodoList />
    </DarkModeProvider>
  );
}

export default App;
