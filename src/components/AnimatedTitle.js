import React from "react";
import "./AnimatedTitle.css";

export default function AnimatedTitle() {
  return (
    <h1 className="animated-title">
      Foot.ai{' '}
      <span role="img" aria-label="football">
        ⚽
      </span>
    </h1>
  );
}
