import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:query" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
