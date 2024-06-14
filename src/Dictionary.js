import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Photos from "./Photos";

// All requests made with the client will be authenticated

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  let [results, setResults] = useState({});
  let [photos, setphotos] = useState({});
  const [error, setError] = useState(null);

  function handlePexelsResponse(response) {
    // console.log(response.data.photos);
    setphotos(response.data.photos);
  }

  function getPhotos() {
    //image Api
    // Documentation of API

    const pexelsApiKey =
      "8JGW0vBhUyPeubSSCyqsnyyogNVb2bNs8TZbKpRPtHT6TkyIEQYt0PJP";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;

    axios(pexelsApiUrl, {
      headers: {
        Authorization: pexelsApiKey
      }
    }).then(handlePexelsResponse);
  }

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);

    if (response.status === 200) {
      getPhotos();
    }
  }

  const search = (event) => {
    event.preventDefault();

    //dictionary api
    // Documentation for API dictionaryapi.dev/
    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    axios
      .get(apiURL)
      .then(handleDictionaryResponse)
      .catch((error) => {
        setError({
          title: "not found in my vocabulary",
          message: "Ops! We couldn't find that word. Try another one!"
        });
      });

    // console.log(apiURL);

    //reset search bar to empty
    let input = document.getElementById("input");
    input.value = "";
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
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
          keyword={keyword}
        />
      )}
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
      <Photos photos={photos} />
    </div>
  );
}
