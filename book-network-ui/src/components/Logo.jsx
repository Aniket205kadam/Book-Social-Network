import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="text-3xl font-bold font-heading">
      <img
        className="h-9"
        src="https://cdn-icons-png.flaticon.com/128/18531/18531662.png"
        alt="logo"
      />
    </Link>
  );
}

export default Logo;
