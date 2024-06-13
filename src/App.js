import logo from "./logo.svg";
import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>word finder</h1>
        </header>
        <main className="shadow-sm p-3 mb-3 rounded">
          <Dictionary />
        </main>
        <footer className="shadow-sm p-3 mb-3 rounded">
          This app was coded by Lúcia Reis and is{" "}
          <a href="https://github.com/larevolucia/react-dictionary">
            open-sourced
          </a>
          .
        </footer>
      </div>
    </div>
  );
}

export default App;
