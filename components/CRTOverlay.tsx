"use client";

import React from "react";

const CRTOverlay: React.FC = () => {
  return (
    <>
      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true" />
      
      {/* Grain/Noise Effect */}
      <div className="grain" aria-hidden="true" />
    </>
  );
};

export default CRTOverlay;
