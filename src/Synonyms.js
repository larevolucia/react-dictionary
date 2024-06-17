import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Synonyms.css";

export default function Synonyms(props) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchStatuses = async () => {
      const newStatus = {};
      for (let synonym of props.synonyms) {
        newStatus[synonym] = "loading";
        try {
          let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${synonym}`;
          await axios.get(apiURL);
          newStatus[synonym] = "api-success"; // Apply CSS class for successful response
        } catch (error) {
          // console.error("Error fetching data:", error);
          newStatus[synonym] = "api-error"; // Apply CSS class for error response
        }
      }
      setStatus(newStatus);
    };

    if (props.synonyms.length > 0) {
      fetchStatuses();
    }
  }, [props.synonyms]);

  if (props.synonyms.length !== 0) {
    return (
      <div className="synonyms">
        {props.synonyms.map((synonym, index) => (
          <form className="synonym-button" key={index} onSubmit={props.search}>
            <input
              type="submit"
              value={synonym}
              onClick={props.keywordChange}
              className={status[synonym] || ""}
              disabled={status[synonym] === "api-error"}
            />
          </form>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
