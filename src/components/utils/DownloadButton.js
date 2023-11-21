import React, { useState, useRef } from "react";
import Confetti from "react-dom-confetti";
import "../css/DownloadButton.scss";

const DownloadButton = () => {
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useState("activate");
  const [confettiActive, setConfettiActive] = useState(false);

  const slowClick = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setButtonState("loading");
      try {
        const response = await fetch("/api/download", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = response.headers
            .get("Content-Disposition")
            .split("filename=")[1];

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          setButtonState("done");
          setConfettiActive(true);
          setTimeout(() => {
            setConfettiActive(false);
            setTimeout(() => {
              setIsLoading(false);
              setButtonState("activate");
            }, 10000);
          }, 1600);
        } else if (response.status === 500) {
          setIsLoading(false);
          setButtonState("activate");
          console.error("Error fetching data, status code 500:");
        }
      } catch (error) {
        setIsLoading(false);
        setButtonState("activate");
        console.error("Error fetching data:", error);
      }
    }
  };

  const config = {
    angle: 90,
    spread: "360",
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.35,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="download-div">
      <a
        ref={buttonRef}
        className={`activate ${buttonState} ${isLoading ? "loading" : ""} ${
          confettiActive ? "done" : ""
        }`}
        onClick={() => slowClick()}
      >
        <span>
          <svg>
            <use xlinkHref="#circle" />
          </svg>
          <svg>
            <use xlinkHref="#arrow" />
          </svg>
          <svg>
            <use xlinkHref="#check" />
          </svg>
        </span>

        <ul>
          <li>Save</li>
          <li>Saving</li>
          <li>Saved!</li>
        </ul>
        <Confetti
          className="loading-button__confetti"
          active={confettiActive}
          config={config}
        />
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          id="circle"
        >
          <circle cx="8" cy="8" r="7.5"></circle>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          id="arrow"
        ></symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          id="check"
        >
          <path
            id="test"
            d="M4.76499011,6.7673683 L8.2641848,3.26100386 C8.61147835,2.91299871 9.15190114,2.91299871 9.49919469,3.26100386 C9.51164115,3.27347582 9.52370806,3.28637357 9.53537662,3.29967699 C9.83511755,3.64141434 9.81891834,4.17816549 9.49919469,4.49854425 L5.18121271,8.82537365 C4.94885368,9.05820878 4.58112654,9.05820878 4.34876751,8.82537365 L2.50080531,6.97362503 C2.48835885,6.96115307 2.47629194,6.94825532 2.46462338,6.93495189 C2.16488245,6.59321455 2.18108166,6.0564634 2.50080531,5.73608464 C2.84809886,5.3880795 3.38852165,5.3880795 3.7358152,5.73608464 L4.76499011,6.7673683 Z"
          ></path>
        </symbol>
      </svg>
    </div>
  );
};

export default DownloadButton;
