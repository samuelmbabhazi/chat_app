import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { usersRouter } from "../utils/Api";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(usersRouter)
      .then(function (response) {
        // handle success
        setUsers(response.data.allUsers);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  console.log("waaaa", users);

  return (
    <Container>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col py-8 pl-6 pr-2 w-64 backdrop-filter backdrop-blur-sm bg-opacity-10 text-white flex-shrink-0">
            <div class="flex flex-row items-center justify-center h-12 w-full">
              <div class="ml-2 font-bold text-2xl">
                <div className="brand">
                  <img src="logo.png" alt="" width={30} />
                  <h1>
                    GOCHAT<span class="text-[15px] text-[#4d00c2]">42</span>
                  </h1>
                </div>
              </div>
            </div>

            <div class="h-10 w-10 rounded-full border-[#4d00c2] overflow-hidden">
              <img
                src="https://api.lorem.space/image/face?w=150&h=150"
                alt="Avatar"
                class="h-full w-full"
              />
            </div>
            <div class="text-sm font-semibold mt-2 text-white">samy</div>
            <div class="text-xs text-gray-500 text-gray">Developper</div>

            <div class="flex flex-col mt-8">
              <div class="flex flex-row items-center justify-between text-xs">
                <span class="font-bold">Conversations</span>
                <span class="flex items-center justify-center bg-[blue] h-4 w-4 rounded-full">
                  4
                </span>
              </div>
              <div
                id="contact"
                class="flex flex-col space-y-1 mt-4 -mx-2 h-60 overflow-y-auto "
              >
                {users &&
                  users.map((name, index) => {
                    return (
                      <button class="flex flex-row items-center hover:border-b-2 hover:border-[blue]  p-2">
                        <div class="flex items-center justify-center h-8 w-8 bg-[blue] rounded-full">
                          {name.username[0].toUpperCase()}
                        </div>
                        <div class="ml-2 text-sm font-semibold">
                          {name.username}
                        </div>
                        <div class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-5 w-5 rounded-full leading-none">
                          2
                        </div>
                      </button>
                    );
                  })}
              </div>
              <div class="flex flex-row items-center justify-between text-xs mt-6">
                <span class="font-bold">Archivied</span>
                <span class="flex items-center justify-center bg-[blue] h-4 w-4 rounded-full">
                  7
                </span>
              </div>
              <div class="flex flex-col space-y-1 mt-4 -mx-2">
                <button class="flex flex-row items-center hover:border-b-2 hover:border-[blue] p-2">
                  <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    C
                  </div>
                  <div class="ml-2 text-sm font-semibold">Credo</div>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col flex-auto h-full p-6 ">
            <div class="flex flex-col flex-auto flex-shrink-0  bg-[ #000000ce] h-full p-4">
              <div
                id="contact"
                class="flex flex-col h-full overflow-x-auto mb-4"
              >
                <div class="flex flex-col h-full">
                  <div class="grid grid-cols-12 gap-y-2">
                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                      <div class="flex flex-row items-center">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                      <div class="flex flex-row items-center">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Vel ipsa commodi illum saepe numquam maxime
                            asperiores voluptate sit, minima perspiciatis.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                      <div class="flex items-center justify-start flex-row-reverse">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>I'm ok what about you?</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                      <div class="flex items-center justify-start flex-row-reverse">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                      <div class="flex flex-row items-center">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Lorem ipsum dolor sit amet !</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                      <div class="flex items-center justify-start flex-row-reverse">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                          <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                            Seen
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                      <div class="flex flex-row items-center">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                            src="https://api.lorem.space/image/face?w=150&h=150"
                            alt="Avatar"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis, in.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
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
                  <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
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
