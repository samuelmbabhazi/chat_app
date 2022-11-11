import React from "react";
import styled from "styled-components";

const Profil = () => {
  return (
    <Container>
      <div class="h-60 w-60 rounded-full border-[#4d00c2] bg-white  overflow-hidden">
        <img src="A.svg" alt="Avatar" class="h-full w-full" />
      </div>
      <div class="text-xl font-semibold mt-3 text-white">samy</div>
      <div class="text-xs text-gray-500 text-gray">Developper</div>
      <button class="bg-[blue] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
        Change Profil
      </button>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000e6;
  padding-right: 50%;
  padding-left: 40%;
  padding-top: 10%;
`;
export default Profil;
