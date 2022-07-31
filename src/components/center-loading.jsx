import React from "react";

export default function CenterLoading({ width, height }) {
  return (
    <div
      style={{
        width: width,
        height: height,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="loader"></div>
      <h1
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          textShadow: "var(--txt-shadow)",
          fontSize: "20px",
        }}
      >
        Loading...
      </h1>
    </div>
  );
}
