import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Photos.css";
import Loader from "./Loader";

export default function Photos({ keyword }) {
  let [pexelsData, setPexelsData] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePexelsResponse = (response) => {
      if (response.photos.length > 0) {
        setPexelsData(response);
      } else {
        setPexelsData(null);
      }
      setIsLoading(false);
    };

    const getPhotos = async () => {
      try {
        const pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY;
        let pexelsApiUrl = `/.netlify/functions/photos?query=${keyword}`;

        const response = await axios.get(pexelsApiUrl, {
          headers: {
            Authorization: pexelsApiKey
          }
        });

        setIsLoading(true);
        handlePexelsResponse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPhotos();
  }, [keyword]);

  return (
    <div>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : pexelsData ? (
        <section className="Photos">
          <h3>images</h3>

          <div className="grid grid-3-col photo-container">
            {pexelsData.photos.map(function (photo, index) {
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
      ) : null}
    </div>
  );
}
