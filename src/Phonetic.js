import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "./Phonetic.css";

export default function Phonetic(props) {
  function playAudio() {
    let audio = new Audio(props.phonetic.audio);
    audio.play();
  }
  if (props.phonetic.audio !== "") {
    return (
      <div className="Phonetic">
        <button onClick={playAudio}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        {props.phonetic.text}
      </div>
    );
  } else {
    return null;
  }
}
