import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Photos from "./Photos";
import Loader from "./Loader";

// All requests made with the client will be authenticated

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  let [results, setResults] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
    setLoading(false);
    setFormSubmitted(true);
  }

  const search = (event) => {
    event.preventDefault();
    if (keyword === " ") {
      setError({
        title: "empty search",
        message: "Oops! It looks like you didn't type anything!"
      });
    } else {
      setLoading(true);

      //dictionary api
      // Documentation for API dictionaryapi.dev/
      let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

      axios
        .get(apiURL)
        .then(handleDictionaryResponse)
        .catch((error) => {
          setLoading(false);
          setError({
            title: "not found in my vocabulary",
            message: "Oops! We couldn't find that word. Try another one!"
          });
        });

      // console.log(apiURL);

      //reset search bar to empty
      let input = document.getElementById("input");
      input.value = "";
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  // error handler
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="Dictionary">
      <form
        className="search-form shadow-sm p-3 mb-3 bg-body rounded"
        onSubmit={search}
      >
        <div className="grid grid-2-col">
          <input
            className="form-control"
            id="input"
            type="search"
            placeholder="Search for a word"
            onChange={handleKeywordChange}
            autoComplete="off"
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <Results
        results={results}
        keywordChange={handleKeywordChange}
        search={search}
      />
      {isLoading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {!error && results !== " " && formSubmitted && (
        <Photos keyword={keyword} />
      )}
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
          keyword={keyword}
        />
      )}
    </div>
  );
}
