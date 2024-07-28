import React from "react";

function Button({ isOpen, onToggle }) {
  return (
    <button className="btn-toggle" onClick={onToggle}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

export default Button;
