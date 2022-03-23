import React, { useState, useEffect } from "react";
import viriyahImage from "../../assets/img/imgagen2.png";

export default function Header() {
  useEffect(() => {
    // console.log("effect was call");
    return () => {
      // console.log("clean up");
    };
  }, []);

  return (
    <div className="header">
      <span className="header-background"></span>
      <img className="header-logo" src={viriyahImage}></img>
    </div>
  );
}
