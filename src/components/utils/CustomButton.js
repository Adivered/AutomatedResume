import React, { useState } from "react";
import "../css/CustomButton.css";

const CustomButton = ({ text, icon: Icon, onClick, rtl }) => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);

    if (onClick) {
      onClick();
    }

    const animationDuration = 1050;
    setTimeout(() => {
      setClicked(false);
    }, animationDuration);
  };

  return (
    <div className="button-container">
      <div className="content">
        <span
          className={`button ${rtl ? "rtl" : "ltr"} ${
            clicked ? "animate" : ""
          }`}
          onClick={handleButtonClick}
        >
          {rtl && (
            <span>
              <Icon />
            </span>
          )}
          {text}
          {!rtl && (
            <span>
              <Icon />
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
export default CustomButton;
