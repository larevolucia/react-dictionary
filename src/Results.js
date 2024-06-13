import React from "react";
import "./Results.css";
import Meaning from "./Meaning";
import Phonetic from "./Phonetic";

export default function Results(props) {
  // console.log(props.keywordchange);

  if (props.results.word) {
    return (
      <div className="Results">
        <section>
          <h2>{props.results.word}</h2>
          {props.results.phonetics.map(function (phonetic, index) {
            return (
              <div key={index}>
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
        </section>

        {props.results.meanings.map(function (meaning, index) {
          return (
            <div key={index}>
              <Meaning
                meaning={meaning}
                keywordChange={props.keywordChange}
                search={props.search}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
