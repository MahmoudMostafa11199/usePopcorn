import React, { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className="box">
      <button className="btn-toggle" onClick={handleToggle}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
