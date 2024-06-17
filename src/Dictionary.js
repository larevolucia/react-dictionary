import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Photos from "./Photos";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({});
  const [photoSearch, setPhotoSearch] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
    setPhotoSearch(keyword);
    setLoading(false);
  }

  const search = async (event) => {
    event.preventDefault();
    if (keyword === "") {
      setError({
        title: "empty search",
        message: "Oops! It looks like you didn't type anything!"
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
      const response = await axios.get(apiURL);
      handleDictionaryResponse(response);
    } catch (error) {
      setLoading(false);
      setError({
        title: "not in my vocabulary",
        message: "Oops! We couldn't find that word. Try another one!",
        keyword
      });
    }

    setKeyword("");
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
            value={keyword}
            placeholder="Search for a word"
            onChange={handleKeywordChange}
            autoComplete="off"
          />
          <button className="search-button" type="submit">
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

      <Photos keyword={photoSearch} />
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
