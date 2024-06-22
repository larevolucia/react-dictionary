import React from "react";
import "../styles/Example.css";

export default function Example(props) {
  if (props.example) {
    return (
      <div className="Example">
        <p className="example-p">
          "<em>{props.example}</em>"
        </p>
      </div>
    );
  } else {
    return null;
  }
}
