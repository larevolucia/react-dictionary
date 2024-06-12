import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");

  function handleResponse(response) {
    console.log(response.data);
  }

  function search(event) {
    event.preventDefault();
    // alert(`Searching for ${keyword}...`);

    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    // Documentation for API dictionaryapi.dev/
    axios.get(apiURL).then(handleResponse);
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
    </div>
  );
}
