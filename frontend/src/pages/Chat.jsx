import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { messageget, usersRouter } from "../utils/Api";
import Message from "../components/Message";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import { FiArrowLeft } from "react-icons/fi";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(undefined);
  const [messages, setmessage] = useState();
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentusermail, setCurrentusermail] = useState(undefined);
  const [currentId, setCurrentId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const [toId, settoId] = useState(undefined);
  const [toUser, settoUser] = useState("Welcome");
  const [input, setInput] = useState("");
  let converse = [];
  let array = [];
  const leftbar = useRef();
  const rightbar = useRef();
  const arrow = useRef();
  const container = useRef();
  const chat = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  //fonction de formatage de la date

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  //recuperation de l'utilisateur courant
  //_______________________________________________________________________________________________________
  useEffect(() => {
    const confUser = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentuser(await JSON.parse(localStorage.getItem("user")));
        setCurrentusermail(await JSON.parse(localStorage.getItem("email")));
        setCurrentId(await JSON.parse(localStorage.getItem("userId")));
      }
    };
    confUser();
  }, [navigate]);

  //___________________________________________________________________________________________________________
  useEffect(() => {
    socket.on("msg-recieved", (data) => {
      setmessage((state) => [...state, data]);
    });
    return () => socket.off("msg-recieved");
  }, [socket]);

  //_______________________________________________________________________________________________
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios(usersRouter, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        setUsers(response.data.allUsers);
      })
      .catch(function (error) {
        console.log(error);
      });
    //______________________________________________________________________________________________________

    //recuperations des messages
    //_______________________________________________________________________________________________________
    axios(`${messageget}${currentId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        console.log(response.data.messages);

        setmessage(response.data.messages);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentId]);

  console.log(messages);
  //_______________________________________________________________________________________________

  //filtre des messages
  //________________________________________________________________________________________________
  const myMessages = messages?.filter((elm) => {
    array.push(elm.to, elm.from);
    converse = [...new Set(array)];
    if (elm.to === toId || elm.from === toId) {
      return true;
    } else return false;
  });

  //filtre user
  const myUsers = users?.filter((elm) => {
    if (converse.includes(elm._id)) {
      return true;
    } else {
      return false;
    }
  });

  //__________________________________________________________________________________________________

  //Envoi de message
  //_________________________________________________________________________________________________________
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(messageget, {
      message: input,
      from: currentId,
      to: toId,
      date: Date.now(),
    });
    socket.emit("send-msg", {
      message: input,
      from: currentId,
      to: toId,
      date: Date.now(),
    });
    console.log("messages envoyer");

    if (data.status === false) {
      console.log("une erreur c'est produite au niveau des data");
    } else {
      setInput("");
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  //______________________________________________________________________________________________________
  //fonction de changement de chat

  const changeChat = (id, name) => {
    settoId(id);
    settoUser(name);

    if (width < breakpoint) {
      leftbar.current.style.display = "none";
      rightbar.current.style.display = "none";
      arrow.current.display = "block";
      chat.current.style.display = "block";
    }
  };

  const mobileClic = () => {
    if (width < breakpoint) {
      leftbar.current.style.display = "block";
      rightbar.current.style.display = "none";
    }
  };
  const mobileAllUSer = () => {
    if (width < breakpoint) {
      leftbar.current.style.display = "none";
      rightbar.current.style.display = "block";
      chat.current.style.display = "none";
    }
  };

  if (users !== undefined) {
    return (
      <div className=" flex flex-col justify-center items-center ">
        <img src="logo2.png" alt="" width={250} />
        <div className="flex flex-col mx-[30%]  h-full max-[620px]:mt-[50%] max-[620px]:ml-[15%]">
          <img src="s1.svg" alt="" width={300} />
        </div>
        <div className="fixed top-52 right-0 h-screen w-screen  flex-col flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <br />
          Loading...
          <p className="w-1/3 text-center text-[gray]">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <Container>
        <div className="flex h-screen  antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div
              ref={leftbar}
              id="leftbar"
              className="flex flex-col py-1 pl-6 pr-2 w-64 text-black max-[620px]:p-0 bg-opacity-25 backdrop-filter backdrop-blur-lg flex-shrink-0 "
            >
              <div className="flex flex-row items-center justify-center max-[620px]:border-b-2 max-[620px]:bg-[gray] max-[620px]:border-[gray]  w-full  ">
                <div className=" font-bold text-2xl">
                  <div className="brand flex py-3 gap-12 items-center ">
                    <div
                      className="flex justify-end gap-28
items-end min-[620px]:hidden "
                    >
                      <div className="flex flex-col">
                        <div className="text-[20px] font-bold mt-2 text-white">
                          Hello,{currentuser} 👋
                        </div>
                        <div className="text-xs text-gray-500 text-[#2e2d2d]">
                          {currentusermail}
                        </div>
                      </div>

                      <a href="/profil">
                        <div className="overflow-hidden  relative w-10 h-10 border-[gray] rounded-full  bg-white ">
                          <svg
                            className="absolute -left-1 w-12 h-12  text-black"
                            fill="black"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex  justify-end justify-between
items-end max-[620px]:hidden"
              >
                <a href="/profil">
                  <div className="overflow-hidden  relative w-10 h-10 border-[gray] rounded-full  bg-white ">
                    <svg
                      className="absolute -left-1 w-12 h-12  text-black"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </a>
                <div className="flex flex-col">
                  <div className="text-[20px] font-bold mt-2 text-black">
                    Hello,{currentuser} 👋
                  </div>
                  <div className="text-xs text-gray-500 text-[#2e2d2d]">
                    {currentusermail}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-3 max-[620px]:mx-6 ">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span id="spanmob" className="font-bold w-[100%]">
                    <button
                      id="mobconver"
                      className="bg-black w-[100%] hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-2 rounded"
                    >
                      Conversations
                    </button>{" "}
                    <button
                      onClick={() => mobileAllUSer()}
                      id="mobile"
                      className="bg-black  hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-2 rounded"
                    >
                      All users
                    </button>{" "}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div
                    id="contact"
                    className="flex flex-col space-y-1 mt-4  max-[620px]:flex-row min-[620px]:hidden  overflow-y-auto "
                  >
                    {users &&
                      users.map((name, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => changeChat(name._id, name.username)}
                            className="flex flex-row items-center max-[620px]:flex-col hover:border-b-2 hover:border-black  p-2"
                          >
                            <div className="overflow-hidden  relative w-10 h-10 border-[gray] rounded-full  bg-black ">
                              <svg
                                className="absolute -left-1 w-12 h-12  text-black"
                                fill="white"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <div className="ml-2 text-sm font-semibold">
                              {name.username}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                  <Users
                    myusers={myUsers}
                    changeChat={changeChat}
                    settoId={settoId}
                    messages={messages}
                  />
                </div>
              </div>
            </div>
            <div
              ref={chat}
              id="chat"
              className="flex flex-col flex-auto h-full   min-[620px]:p-6 "
            >
              <div className="flex flex-col flex-auto flex-shrink-0   bg-[#e6e4e2] min-[620px]:rounded-xl h-[95vh] max-[620px]:h-[100vh] ">
                <button className="flex flex-row items-center   p-2">
                  <button
                    ref={arrow}
                    onClick={() => mobileClic()}
                    className="retour"
                  >
                    <FiArrowLeft />
                  </button>
                  <div className="overflow-hidden relative w-10 h-10 bg-opacity-25 backdrop-filter backdrop-blur-lg  rounded-full  dark:bg-gray-600">
                    <svg
                      className="absolute -left-1 w-12 h-12 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-medium text-black px-3 ">
                    <div>{toUser}</div>
                    <div className="text-sm text-gray-500   ">GoChat</div>
                  </div>
                </button>
                <div
                  ref={container}
                  id="contact"
                  className="flex flex-col h-full  overflow-x-auto mb-4"
                >
                  {toId === undefined ? (
                    <Welcome />
                  ) : (
                    <Message
                      messages={myMessages}
                      toId={toId}
                      currentId={currentId}
                      toUser={toUser}
                      formatDateFromTimestamp={formatDateFromTimestamp}
                    />
                  )}
                </div>
                <div className="flex flex-row items-center h-16 bg-opacity-25 backdrop-filter backdrop-blur-lg bg-black w-full px-4">
                  <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        name="message"
                        type="text"
                        value={input}
                        placeholder="Tap Your Message "
                        className="flex w-full focus border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        onChange={(e) => handleChange(e)}
                      />
                      {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button> */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      type="submit"
                      onClick={(event) => handleSubmit(event)}
                      className="flex items-center justify-center     rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span className="ml-2">
                        <svg
                          className="w-8 h-8 transform rotate-45 -mt-px hover:text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* //rightbar */}
            <div
              ref={rightbar}
              id="rightbar"
              className="flex flex-col py-8 pl-6 pr-2 w-56 text-black bg-opacity-25 backdrop-filter backdrop-blur-lg flex-shrink-0"
            >
              <div className="flex flex-col mt-3 ">
                <div className="flex flex-row items-center justify-between text-xs ">
                  <span id="spanmob" className="font-bold w-[100%]">
                    <button
                      id="mobconver"
                      className="bg-black w-[100%] hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-2 rounded"
                    >
                      All Users
                    </button>{" "}
                    <button
                      onClick={() => mobileClic()}
                      id="mobile"
                      className="bg-black  hover:bg-white hover:text-black hover:border hover:border-black text-white font-bold py-2 px-2 rounded"
                    >
                      Conversations
                    </button>{" "}
                  </span>
                </div>

                <div
                  id="contact"
                  className="flex flex-col space-y-1 mt-4  h-96 max-[620px]:h-[85vh]   overflow-y-auto "
                >
                  {users &&
                    users.map((name, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => changeChat(name._id, name.username)}
                          className="flex flex-row items-center  hover:border-b-2 hover:border-black border-b-[1px] border-[#f5f5f5]  p-2"
                        >
                          <div className="flex items-center justify-center h-8 w-8 max-[620px]:h-12 max-[620px]:w-12 bg-black rounded-full text-white">
                            {name.username[0]?.toUpperCase()}
                          </div>
                          <div className="ml-2 text-sm font-semibold">
                            {name.username}
                          </div>
                        </button>
                      );
                    })}
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
  width: 100%;
  .retour {
    display: none;
  }
  #mobile {
    display: none;
  }
  #contact {
    margin-right: 5px;
    &::-webkit-scrollbar {
      width: 0.1rem;
      height: 0.1rem;
      &-thumb {
        background-color: black;
      }
    }
  }
  @media screen and (max-width: 992px) {
    #leftbar {
      width: 20%;
    }
    #rightbar {
      width: 20%;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100vw;
    .retour {
      display: block;
    }
    #spanmob {
      display: flex;
      gap: 10%;
    }
    #mobile {
      display: block;
      width: 40%;
    }
    #mobconver {
      background-color: white;
      border: 1px solid;
      color: black;
      width: 45%;
    }
    #leftbar {
      width: 100%;
    }
    #rightbar {
      width: 100%;
    }
    #chat {
      width: 100%;
      height: 95%;
    }
  }
  @media screen and (max-width: 350px) {
  }
`;

export default Chat;
