import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRouter } from "../utils/ApiRoute";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("is in validation", registerRouter);
    const { password, username, email } = values;
    console.log(values);
    const { data } = await axios.post(registerRouter, {
      username,
      email,
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
            <img src="" alt="" />
            <h1>GoChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">signup</button>
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
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
  background-color: white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: blue;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 1px solid blue;

    border-radius: 1rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
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
      background-color: blue;
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
        border: 0.1rem solid blue;
        background-color: transparent;
        color: blue;
      }
    }
    span {
      color: gray;
      font-size: 15px;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
