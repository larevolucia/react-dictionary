import React from "react";
import "../styles/Meaning.css";
import Example from "./Example";
import Synonyms from "./Synonyms";

export default function Meaning(props) {
  // console.log(props.meaning);
  return (
    <section className="Meaning shadow-sm p-3 mb-3 bg-body rounded">
      <h3>{props.meaning.partOfSpeech}</h3>

      {props.meaning.definitions.map(function (definition, index) {
        return (
          <div key={index}>
            <p className="definition">{definition.definition}</p>
            <Example example={definition.example} />
            <Synonyms
              synonyms={definition.synonyms}
              keywordChange={props.keywordChange}
              search={props.search}
            />
          </div>
        );
      })}
    </section>
  );
}
