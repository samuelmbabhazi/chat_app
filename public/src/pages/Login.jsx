import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRouter } from "../utils/ApiRoute";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("is in validation", loginRouter);
    const { password, username } = values;
    console.log(values);
    const { data } = await axios.post(loginRouter, {
      username,
      password,
    });
    if (data.status === false) {
      console.log("une erreur c'est produite au niveau des data");
    }
    if (data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  // const handleValidation = (event) => {
  //   const { confirmpassword, password, username, email } = values;
  //   if (confirmpassword !== password) {
  //     toast.error("password and confirm password must be same", toastOption);
  //     return false;
  //   } else if (username.length < 3) {
  //     toast.error("username should be greater than 3 character", toastOption);
  //     return false;
  //   } else if (password.length < 8) {
  //     toast.error("username should be greater than 8 character", toastOption);
  //     return false;
  //   } else if (email === "") {
  //     toast.error("email is required", toastOption);
  //     return false;
  //   }
  //   return true;
  // };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="logo.png" alt="" />
            <h1>GoChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Dont have an account ? <Link to={"/register"}>Signup</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000000ce;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
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
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid white;
      border-radius: 0.4rem;
      color: gray;
      width: 100%;
      font-size: 0.7rem;
      &:focus {
        border: 0.1rem solid blueviolet;
        outline: none;
      }
    }
    button {
      background-color: #a068f8;
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
        border: 0.1rem solid #a068f8;
        background-color: transparent;
        color: #a068f8;
      }
    }
    span {
      color: gray;
      font-size: 15;
      text-transform: uppercase;

      a {
        color: #a068f8;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
