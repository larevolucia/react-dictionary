import logo from "./logo.svg";
import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h1>word finder</h1>
        </header>
        <main className="shadow-sm p-3 mb-3 rounded">
          <Dictionary />
        </main>
        <footer className="shadow-sm p-3 mb-3 rounded">
          <p>
            This app was coded by Lúcia Reis and is{" "}
            <a
              href="https://github.com/larevolucia/react-dictionary"
              target="_blank"
              rel="noreferrer"
            >
              open-sourced
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
