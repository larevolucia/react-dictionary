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
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState({});
  let [photoSearch, setPhotoSearch] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
    setPhotoSearch(keyword);
    setLoading(false);
  }

  const search = (event) => {
    event.preventDefault();
    if (keyword === "") {
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
            message: "Oops! We couldn't find that word. Try another one!",
            keyword: keyword
          });
        });

      // console.log(apiURL);

      //reset search bar to empty
      let input = document.getElementById("input");
      input.value = "";
      setKeyword("");
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
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
      {<Photos keyword={photoSearch} />}
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
          keyword={error.keyword}
        />
      )}
    </div>
  );
}
