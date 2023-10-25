import React, { useState } from "react";
import "./Global.scss";

const Header = () => {
  const [selectedText, setSelectedText] = useState("Tarefas");

  const handleMouseOver = (event) => {
    if (selectedText !== event.target.textContent) {
      event.target.style.backgroundColor = "white";
      event.target.style.color = "blue";
      event.target.style.padding = "10px 8px";
      event.target.style.borderRadius = "10px";
    }
  };

  const handleMouseOut = (event) => {
    if (selectedText !== event.target.textContent) {
      event.target.style.backgroundColor = "";
      event.target.style.color = "";
      event.target.style.padding = "";
      event.target.style.borderRadius = "";
    }
  };

  const handleClick = (event) => {
    setSelectedText(event.target.textContent);
  };

  return (
    <div className="header">
      <div className="header-text">
        <p>
          <strong>
            <span
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={handleClick}
              style={{
                cursor: "pointer",
                backgroundColor: selectedText === "Organização" ? "white" : "",
                color: selectedText === "Organização" ? "blue" : "",
                padding: selectedText === "Organização" ? "3px 6px" : "",
                borderRadius: selectedText === "Organização" ? "5px" : "",
              }}
            >
              Organização
            </span>
          </strong>
        </p>
        <p>
          <strong>
            <span
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={handleClick}
              style={{
                cursor: "pointer",
                backgroundColor: selectedText === "Tarefas" ? "white" : "",
                color: selectedText === "Tarefas" ? "blue" : "",
                padding: selectedText === "Tarefas" ? "3px 6px" : "",
                borderRadius: selectedText === "Tarefas" ? "5px" : "",
              }}
            >
              Tarefas
            </span>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Header;
