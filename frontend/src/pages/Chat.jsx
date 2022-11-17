import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { messageget, usersRouter } from "../utils/Api";
import Message from "../components/Message";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import Deconnect from "../components/Deconnect";

const Chat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setmessage] = useState();
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentId, setCurrentId] = useState(undefined);
  const [toId, settoId] = useState(undefined);
  const [toUser, settoUser] = useState("Welcome");
  const [values, setValues] = useState({
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { message } = values;
    const { data } = await axios.post(messageget, {
      message: message,
      from: currentId,
      to: toId,
    });
    if (data.status === false) {
      console.log("une erreur c'est produite au niveau des data");
    } else {
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const changeChat = (id, name) => {
    settoId(id);
    settoUser(name);
  };

  useEffect(() => {
    const confUser = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentuser(await JSON.parse(localStorage.getItem("user")));
        setCurrentId(await JSON.parse(localStorage.getItem("userId")));
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

    axios(messageget, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        // handle success
        setmessage(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  const myMessages = messages?.message.filter((elm) => {
    if (
      (elm.to === toId && elm.from === currentId) ||
      (elm.to === currentId && elm.from === toId)
    )
      return true;
    else return false;
  });
  // {$or:[{from: '636c070eaa2ce6a0b07afc9f'}, {to:'636c070eaa2ce6a0b07afc9f'}]}
  console.log(myMessages);
  return (
    <Container>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col py-8 pl-6 pr-2 w-64 backdrop-filter backdrop-blur-sm bg-opacity-10 text-white bg-white flex-shrink-0">
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
              <img src="A.svg" alt="Avatar" class="h-full w-full" />
            </div>
            <div class="text-sm font-semibold mt-2 text-white">
              <a href="/profil">{currentuser}</a>
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
              <Users users={users} changeChat={changeChat} settoId={settoId} />
            </div>
            <Deconnect />
          </div>
          <div class="flex flex-col flex-auto h-full p-6 ">
            <div class="flex flex-col flex-auto flex-shrink-0  bg-[ #000000ce] h-full p-4">
              <button class="flex flex-row items-center   p-2">
                <div class="overflow-hidden relative w-10 h-10  rounded-full  dark:bg-gray-600">
                  <svg
                    class="absolute -left-1 w-12 h-12 text-gray-400"
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
                <div class="font-medium text-gray-500  px-3">
                  <div>{toUser}</div>
                  <div class="text-sm text-[blue] ">GoChat</div>
                </div>
              </button>
              <div
                id="contact"
                class="flex flex-col h-full overflow-x-auto mb-4"
              >
                <Message
                  messages={myMessages}
                  toId={toId}
                  currentId={currentId}
                />
              </div>
              <div class="flex flex-row items-center h-16 rounded-xl bg-[#000000ce] w-full px-4">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4">
                  <div class="relative w-full">
                    <input
                      name="message"
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      onChange={(e) => handleChange(e)}
                    />
                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                    class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span class="ml-2">
                      <svg
                        class="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
