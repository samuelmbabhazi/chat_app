import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { usersRouter } from "../utils/Api";
import Message from "../components/Message";
import Input from "../components/Input";
import Users from "../components/Users";
import { Navigate, useNavigate } from "react-router-dom";
import Deconnect from "../components/Deconnect";

const Chat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentuser, setCurrentuser] = useState(undefined);

  useEffect(() => {
    const confUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentuser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    confUser();
  }, []);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios(usersRouter, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        // handle success
        setUsers(response.data.allUsers);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  console.log(currentuser);
  return (
    <Container>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col py-8 pl-6 pr-2 w-64 backdrop-filter backdrop-blur-sm bg-opacity-10 text-white flex-shrink-0">
            <div class="flex flex-row items-center  h-12 w-full my-3">
              <div class=" font-bold text-2xl">
                <div className="brand">
                  <img src="logo.png" alt="" width={30} />
                  <h1 class="">
                    GOCHAT<span class="text-[15px] text-[#4d00c2]">42</span>
                  </h1>
                </div>
              </div>
            </div>

            <div class="h-10 w-10 rounded-full border-[#4d00c2] bg-white  ">
              <img src="A1.svg" alt="Avatar" class="h-full w-full" />
            </div>
            <div class="text-sm font-semibold mt-2 text-white">
              <a href="/profil">samy</a>
            </div>
            <div class="text-xs text-gray-500 text-gray">Developper</div>

            <div class="flex flex-col mt-8">
              <div class="flex flex-row items-center justify-between text-xs">
                <span class="font-bold">
                  <button class="bg-[blue] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Conversations
                  </button>{" "}
                  <button class="bg-[blue] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded">
                    All users
                  </button>{" "}
                </span>
              </div>
              <Users users={users} />
            </div>
            <Deconnect />
          </div>
          <Message />
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000e6;
  #contact {
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: blue;
      }
    }
  }
`;

export default Chat;
