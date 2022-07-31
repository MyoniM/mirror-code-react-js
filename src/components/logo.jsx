import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo({ src }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        color: "white",
      }}
      onClick={() => navigate(`/`)}
    >
      <img src={src} width="70" height="65" alt="logo"/>
      <h3
        style={{
          zIndex: 100,
          marginLeft: "5px",
          textShadow: "var(--txt-shadow)",
          fontFamily: "IBM Plex Sans,sans-serif",
        }}
      >
        MIRROR CODE
      </h3>
    </div>
  );
}
