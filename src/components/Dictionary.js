import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/Dictionary.css";
import Modal from "./Modal";
import Results from "./Results";
import Loader from "./Loader";
import Photos from "./Photos";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Dictionary({ onSearch, query, data }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(query || "");
  const [photoKeyword, setPhotoKeyword] = useState(null);
  const [rawResults, setRawResults] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDictionaryResponse = useCallback(
    (response) => {
      setRawResults(response.data[0]);
      onSearch(response.data[0]);
      setPhotoKeyword(query);

      setLoading(false);
    },
    [onSearch, query]
  );

  const searchDictionary = useMemo(
    () =>
      debounce(async (keyword) => {
        setLoading(true);
        setError(null);
        try {
          const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
          const response = await axios.get(apiURL);
          handleDictionaryResponse(response);
        } catch (error) {
          setLoading(false);
          setError({
            title: `${keyword}: word not found`,
            message: "Oops! We couldn't find that word. Try another one!"
          });
        }
      }, 500),
    [handleDictionaryResponse]
  );

  const searchDictionaryRef = useRef(searchDictionary);

  useEffect(() => {
    searchDictionaryRef.current = searchDictionary;
  }, [searchDictionary]);

  useEffect(() => {
    if (query) {
      searchDictionaryRef.current(query);
    }
  }, [query]);

  const search = async (event) => {
    event.preventDefault();
    if (keyword === "") {
      setError({
        title: "empty search",
        message: "Oops! It looks like you didn't type anything!"
      });
      return;
    }
    navigate(`/${keyword}`);
    searchDictionaryRef.current(keyword);
    setKeyword("");
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  const memoizedResults = useMemo(() => rawResults, [rawResults]);

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
        results={memoizedResults}
        keywordChange={handleKeywordChange}
        search={search}
      />
      {isLoading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <Photos keyword={photoKeyword} />
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
    </div>
  );
}
