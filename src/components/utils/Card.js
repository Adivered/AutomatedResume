import React from "react";
import "../css/card.css";

const Card = ({ children }) => {
  return (
    <div className="checkout">
      <div className="credit-card-box">
        <div className="front"> {children}</div>
      </div>
    </div>
  );
};

export default Card;
