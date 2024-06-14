import React from "react";
import "./Photos.css";

export default function Photos(props) {
  if (props.photos.length > 0) {
    //    console.log(props.photos);
    return (
      <section className="Photos">
        <h3>images</h3>
        <div className="grid grid-3-col photo-container">
          {props.photos.map(function (photo, index) {
            return (
              <div key={index}>
                <a href={photo.url} target="_blank" rel="noreferrer">
                  <img src={photo.src.landscape} alt={photo.alt} />
                </a>
                <p className="credits">
                  Credits:{" "}
                  <a
                    target="_blank"
                    href={photo.photographer_url}
                    rel="noreferrer"
                  >
                    {photo.photographer}
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
