import "./App.css";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import TodoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./components/context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <TodoList />
      <ScrollToTop />
    </DarkModeProvider>
  );
}

export default App;
