import { useState } from "react";
import Header from "./components/Header";
import TooglerView from "./components/TooglerView";
import "./styles/main.scss";

function App() {
  const [section, setSection] = useState("all");

  return (
    <div className="home_page">
      <Header />
      <TooglerView section={section} setSection={setSection} />
    </div>
  );
}

export default App;
