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
      class="bg-[blue] hover:bg-blue-700 text-white my-10 w-8 font-bold py-1 px-2 rounded "
    >
      <FiLogOut />
    </button>
  );
};

export default Deconnect;