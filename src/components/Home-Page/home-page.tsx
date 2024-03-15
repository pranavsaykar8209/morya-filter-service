import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { HomeHeadingData } from "../../constant/home-heading-data";

const HomePage = () => {
  const [count, setcount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setcount((prev) => (prev + 1) % 3);
    }, 10000);
  }, [count]);

  return (
    <div>
      <div
        className="container d-flex justify-content-between align-items-center flex-md-row flex-column"
        style={{
          minHeight: "70vh",
          padding: "20px",
        }}
      >
        <div className="right w-100 mb-4">
          <h1 style={{ color: "#081f46" }} className="fs-md-120 fs-sm-2">
            {HomeHeadingData[count].Title}
          </h1>
          <h2 style={{ color: "#379eff", fontSize: "2rem" }}>
            {HomeHeadingData[count].SubTitle}
          </h2>
          <div style={{ fontSize: "18px", color: "#081f46" }}>
            {HomeHeadingData[count].Desc}
          </div>
          <div className="btn btn-primary mt-3 me-3">
            Buy Now <Icon icon="mdi:cart-outline" />
          </div>
          <div className="btn btn-primary mt-3">
            View Details <Icon icon="carbon:view" />
          </div>
        </div>
        <div className="left w-30">
          <img
            style={{ maxHeight: "400px", maxWidth: "600px" }}
            src={HomeHeadingData[count].Image}
            alt="kent"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
