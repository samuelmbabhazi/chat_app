import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import { loginRouter } from "../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const showToastMessageFailed = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { password, username } = values;
    const { data } = await axios.post(loginRouter, {
      password,
      username,
    });
    if (data.status === false) {
      showToastMessageFailed("Username Or Password Invalid");
    } else {
      showToastMessage("Connect");
      localStorage.setItem("token", JSON.stringify(data.token));
      console.log("bien connecter");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("userId", JSON.stringify(data.userId));
      socket.emit("connected", { username });
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="lo.png" alt="" width={70} />
            <h1>
              GoChat<sup>42</sup>
            </h1>
          </div>
          <label for="inp" className="inp">
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              id="inp"
              placeholder="&nbsp;"
              required
            />
            <span className="label">Username</span>
            <span className="focus-bg"></span>
          </label>
          <label for="inp" className="inp">
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              id="inp"
              placeholder="&nbsp;"
              required
            />
            <span className="label">Password</span>
            <span className="focus-bg"></span>
          </label>

          <button type="submit">Login</button>
          <span>
            Dont have an account ? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <div className="text">
          <h1>Welcome Friend"</h1>

          <img src="s1.svg" alt="" width={500} />
        </div>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  color: black;
  gap: 1rem;
  align-items: center;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-left: 10px;
    h1 {
      color: black;

      width: 330px;
      font-size: 72px;
      font-weight: bold;
      /* background: -webkit-linear-gradient(gray, white);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
    p {
      width: 400px;
      color: gray;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
      font-size: 30px;
      font-weight: bold;
      span {
        font-size: 15px;
        /* color: #4d00c2; */
        color: black;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: none;
    border-radius: 1rem;
    padding: 3rem 5rem;

    input {
      &:focus {
        padding-top: 1.2rem;

        outline: none;
      }
    }
    .inp {
      position: relative;
      margin: auto;
      width: 100%;
      max-width: 280px;
      border-radius: 3px;
      overflow: hidden;
    }
    .label {
      position: absolute;
      top: 20px;
      left: 12px;
      color: gray;
      font-size: 12px;
      transform-origin: 0 0;
      transform: translate3d(0, 0, 0);
      transition: all 0.2s ease;
      pointer-events: none;
    }
    .focus-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
    }

    input {
      background-color: transparent;
      padding: 0.7rem;
      border-bottom: 0.1rem solid black;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      line-height: 2rem;
      transition: all 0.15s ease;
    }

    input:not(:placeholder-shown) + .label {
      color: gray;
      transform: translate3d(0, -12px, 0) scale(0.75);
    }

    input:focus {
      outline: none;
      background-color: transparent;
      + .label {
        color: gray;
        transform: translate3d(0, -10px, 0) scale(0.75);
        + .focus-bg {
          transform: scaleX(1);
          transition: all 0.1s ease;
        }
      }
    }

    button {
      /* background-color: #4d00c2; */
      background-color: black;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        border: 0.1rem solid black;
        background-color: transparent;
        color: black;
      }
    }
    span {
      color: gray;
      font-size: 15;

      a {
        color: black;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .text {
      display: none;
    }
    form {
      width: 100vw;
      input {
        width: 100vh;
      }
    }
  }
`;

export default Login;
