import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Profil = () => {
  const [currentuser, setCurrentuser] = useState(undefined);
  useEffect(() => {
    const confUser = async () => {
      if (localStorage.getItem("user")) {
        setCurrentuser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    confUser();
  }, []);
  return (
    <Container>
      <div class="overflow-hidden relative w-32 h-32  rounded-full  dark:bg-gray-600">
        <svg
          class="absolute -left-1 w-36 h-36 text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="text-xl font-semibold mt-3 text-black">{currentuser}</div>
      <div class="text-xs text-gray-500 text-gray">Developper</div>
      <button class="bg-black hover:bg-white w-[100] hover:text-black hover:border hover:border-black text-white font-bold py-2 px-4 mx-3 rounded">
        Set Profil
      </button>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Profil;
