import React, { useEffect, useState } from "react";
import "../css/Loader.css";

const Loader = () => {
  const [configuration, setConfiguration] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfiguration((prevConfiguration) =>
        prevConfiguration === 1 ? 2 : 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="wrapper" data-configuration={configuration}>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
};

export default Loader;
