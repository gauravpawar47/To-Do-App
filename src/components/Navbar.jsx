import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-black text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-8">To Do</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <a href="/Login">
          <li className="cursor-pointer hover:font-bold transition-all">
            Log In
          </li>
        </a>
          <a href="/Signup">
          <li className="cursor-pointer hover:font-bold transition-all">
            Sign In
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
