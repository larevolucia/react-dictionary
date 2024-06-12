import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  let [results, setResults] = useState({});

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function search(event) {
    event.preventDefault();
    // alert(`Searching for ${keyword}...`);

    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    // Documentation for API dictionaryapi.dev/
    axios
      .get(apiURL)
      .then(handleResponse)
      .catch((error) => {
        alert("Ops! We couldn't find that word. Try again!");
      });
    console.log(apiURL);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="Search for a word"
          onChange={handleKeywordChange}
        />
      </form>
      <Results results={results} />
    </div>
  );
}
