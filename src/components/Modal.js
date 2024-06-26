import React from "react";
import "../styles/Modal.css";

export default function Modal(props) {
  return (
    <div className="error-modal">
      <div className="modalBackdrop">
        <div className="modal-container">
          <header>
            <h2 className="modal-title">{props.title}</h2>
          </header>
          <div className="error-msg">
            <p>{props.message}</p>
          </div>
          <footer className="modal-close">
            <button type="button" onClick={props.onClose}>
              close
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
