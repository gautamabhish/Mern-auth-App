import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 text-xl">
        <div className="font-bold">
          <Link to="/">Auth App</Link>
        </div>
        <ul className="flex gap-6 ">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
