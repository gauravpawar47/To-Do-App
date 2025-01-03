import React from "react";
import { auth } from "./firebase"; // Make sure to import the auth instance
import { useNavigate } from "react-router-dom"; // For navigation

const Navbar = () => {
  const history = useNavigate(); // For programmatic navigation

  const handleLogout = async () => {
    try {
      // Sign the user out using Firebase Auth
      await auth.signOut();

      // Redirect user to the login page
      history.push("./Login");

      // Optionally, log success to the console
      console.log("User logged out successfully!");
    } catch (error) {
      // Log any errors
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="flex justify-between bg-black text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-8">To Do</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li
          onClick={handleLogout} // Trigger logout on click
          className="cursor-pointer hover:font-bold transition-all"
        >
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
