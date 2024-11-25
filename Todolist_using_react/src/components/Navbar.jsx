import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center bg-zinc-800 text-white py-3 ">
      <div className="logo mx-5 cursor-pointer">
        <span className="font-bold text-xl ">My tasks</span>
      </div>
      <div>
        <ul className="flex gap-8 mx-5 cursor-pointer">
          <li  className="hover:font-bold transition-all duration-200">Home</li>
          <li  className="hover:font-bold transition-all duration-200">Your task</li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
