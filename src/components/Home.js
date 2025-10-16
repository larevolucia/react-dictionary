import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../logo.svg";
import "../styles/App.css";
import Dictionary from "../components/Dictionary";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="Home">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h1>word finder</h1>
        </header>
        <main className="shadow-sm rounded">
          <Dictionary
            onSearch={handleSearchResults}
            query={query}
            data={searchResults}
          />
        </main>
      <footer className="shadow-sm p-2 rounded">
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
  );
}

export default Home;
