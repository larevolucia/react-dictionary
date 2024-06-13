import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
  // console.log(props);

  if (props.synonyms.length !== 0) {
    return (
      <div className="synonyms">
        <span>Synonyms:</span>
        {props.synonyms.map((synonym, index) => (
          <form className="synonym-button" key={index} onSubmit={props.search}>
            <input
              type="submit"
              value={synonym}
              onClick={props.keywordChange}
            />
          </form>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
