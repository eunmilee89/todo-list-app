import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { DarkModeProvider } from "./components/context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Outlet />
      <ScrollToTop />
    </DarkModeProvider>
  );
}

export default App;
