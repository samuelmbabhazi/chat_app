import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="logo.png" alt="" width={70} />
            <h1>
              GoChat<span>42</span>
            </h1>
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
            Dont have an account ? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <div className="text">
          <h1>Welcome Friend"</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            temporibus velit asperiores, blanditiis enim laboriosam doloremque!
          </p>
          <img src="s2.svg" alt="" width={500} />
        </div>
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
  gap: 1rem;
  align-items: center;
  background-color: #000000ce;
  .text {
    h1 {
      font-size: 45px;
      width: 330px;
      font-size: 72px;
      font-weight: bold;
      background: -webkit-linear-gradient(#eee, #4d00c2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
      color: white;
      text-transform: uppercase;
      font-size: 30px;
      font-weight: bold;
      span {
        font-size: 15px;
        color: #4d00c2;
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
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid white;
      border-radius: 0.4rem;
      color: gray;
      width: 100%;
      font-size: 0.7rem;
      &:focus {
        border: 0.1rem solid #4d00c2;
        outline: none;
      }
    }
    button {
      background-color: #4d00c2;
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
        border: 0.1rem solid #4d00c2;
        background-color: transparent;
        color: #4d00c2;
      }
    }
    span {
      color: gray;
      font-size: 15;
      text-transform: uppercase;

      a {
        color: #4d00c2;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column-reverse;
    form {
    }
    .text {
      margin-top: 20%;
      width: 90%;
      h1 {
        font-size: 40px;
        width: 100%;
      }
      p {
        display: none;
      }
      img {
        width: 50%;
      }
    }
  }
`;

export default Login;
