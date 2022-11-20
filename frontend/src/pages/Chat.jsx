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
  const [conversation, setConversation] = useState();

  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(messageget, {
      message: input,
      from: currentId,
      to: toId,
      toname: toUser,
    });
    if (data.status === false) {
      console.log("une erreur c'est produite au niveau des data");
    } else {
      setInput("");
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
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
    ) {
      return true;
    } else return false;
  });

  if (!(users || messages)) {
    return (
      <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <Container>
        <div class="flex h-screen antialiased text-gray-800">
          <div class="flex flex-row h-full w-full overflow-x-hidden">
            <div class="flex flex-col py-8 pl-6 pr-2 w-64 text-black bg-[#e6e4e2] flex-shrink-0">
              <div class="flex flex-row items-center  h-12 w-full my-3">
                <div class=" font-bold text-2xl">
                  <div className="brand flex">
                    <img src="lo.png" alt="" width={40} />
                    <h1 class="">
                      GOCHAT<sup class="text-[15px] ">42</sup>
                    </h1>
                  </div>
                </div>
              </div>

              <div class="overflow-hidden relative w-10 h-10  rounded-full  dark:bg-gray-600">
                <svg
                  class="absolute -left-1 w-12 h-12 text-black"
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
              <div class="text-sm font-semibold mt-2 text-black">
                <a href="/profil">{currentuser}</a>
              </div>
              <div class="text-xs text-gray-500 text-gray">Developper</div>

              <div class="flex flex-col mt-8">
                <div class="flex flex-row items-center justify-between text-xs">
                  <span class="font-bold">
                    <button class="bg-black hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-2 rounded">
                      Conversations
                    </button>{" "}
                    <button class="bg-black hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-4 mx-3 rounded">
                      All users
                    </button>
                  </span>
                </div>
                <Users
                  users={users}
                  changeChat={changeChat}
                  settoId={settoId}
                />
              </div>
              <Deconnect />
            </div>
            <div class="flex flex-col flex-auto h-full p-6 ">
              <div class="flex flex-col flex-auto flex-shrink-0   bg-[#e6e4e2] rounded-xl h-full  ">
                <button class="flex flex-row items-center   p-2">
                  <div class="overflow-hidden relative w-10 h-10  rounded-full  dark:bg-gray-600">
                    <svg
                      class="absolute -left-1 w-12 h-12 text-black"
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
                  <div class="font-medium text-black px-3 ">
                    <div>{toUser}</div>
                    <div class="text-sm text-gray-500   ">GoChat</div>
                  </div>
                </button>
                <div
                  id="contact"
                  class="flex flex-col h-full px-14 overflow-x-auto mb-4"
                >
                  <Message
                    messages={myMessages}
                    toId={toId}
                    currentId={currentId}
                    toUser={toUser}
                  />
                </div>
                <div class="flex flex-row items-center h-16  bg-black w-full px-4">
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
                        value={input}
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
                      class="flex items-center justify-center bg-black hover:border hover:bg-white  rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span class="ml-2">
                        <svg
                          class="w-8 h-8 transform rotate-45 -mt-px hover:text-black"
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
  }
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: black;
  #contact {
    margin-right: 5px;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: black;
      }
    }
  }
`;

export default Chat;
