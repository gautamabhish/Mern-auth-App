import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 text-xl">
        <div className="font-bold">
          <Link to="/">Auth App</Link>
        </div>
        <ul className="flex gap-6 ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        
          <Link to = "/profile">
          
            {
              currentUser?
              ( <img src= {currentUser.profilePicture} className="h-7 w-7 rounded-full object-cover" alt = 'Pic'/>)
            :
            <li>Sign In</li>
          }
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
