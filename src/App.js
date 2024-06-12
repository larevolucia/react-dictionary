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
        <main>
          <Dictionary />
        </main>
        <footer>Coded by Lucia</footer>
      </div>
    </div>
  );
}

export default App;
