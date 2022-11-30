import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Deconnect = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-black hover:bg-white hover:text-black hover:border hover:border-black mx-[48px] mx-l-[0px] text-white my-3 w-8 font-bold py-1 px-2 rounded "
    >
      <FiLogOut />
    </button>
  );
};

export default Deconnect;
