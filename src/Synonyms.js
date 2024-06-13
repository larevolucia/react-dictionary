import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
  //console.log(props.synonyms);

  if (props.synonyms.length !== 0) {
    return (
      <div className="synonyms">
        {props.synonyms.map((synonym, index) => (
          <span key={index}>{synonym} </span>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
