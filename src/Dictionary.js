import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";
import Modal from "./Modal";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  // let [msg, setMsg] = useState(" ");
  let [results, setResults] = useState({});
  const [error, setError] = useState();

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  const search = (event) => {
    event.preventDefault();
    // alert(`Searching for ${keyword}...`);

    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    // Documentation for API dictionaryapi.dev/
    axios
      .get(apiURL)
      .then(handleResponse)
      .catch((error) => {
        setError({
          title: "Not in my vocabulary",
          message: "Ops! We couldn't find that word. Try another one!"
        });
      });

    console.log(apiURL);
    let input = document.getElementById("input");
    input.value = "";
  };
  const errorHandler = () => {
    setError(null);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="Dictionary">
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
      <form onSubmit={search}>
        <input
          id="input"
          type="search"
          placeholder="Search for a word"
          onChange={handleKeywordChange}
          autoComplete="off"
        />
      </form>
      <Results
        results={results}
        keywordChange={handleKeywordChange}
        search={search}
      />
    </div>
  );
}
