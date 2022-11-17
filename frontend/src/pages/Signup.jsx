import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import { registerRouter } from "../utils/Api";

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
    } else {
      console.log("bien enregistre");
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Container>
        <div id="text" className="text">
          <h1>Let's Get Started</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            temporibus velit asperiores, blanditiis enim laboriosam doloremque!
          </p>
          <img src="s2.svg" alt="" width={500} />
          {/* <button className="mobile">
            <a href="#form">Get Started</a>{" "}
          </button> */}
        </div>

        <form id="form" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src="log.png" alt="" width={70} /> */}
            <h1>
              GoChat<sup>42</sup>
            </h1>
          </div>
          <label for="inp" class="inp">
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
            />
            <span class="label">Username</span>
            <span class="focus-bg"></span>
          </label>
          <label for="inp" class="inp">
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
            />
            <span class="label">Email</span>
            <span class="focus-bg"></span>
          </label>
          <label for="inp" class="inp">
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
            />
            <span class="label">Password</span>
            <span class="focus-bg"></span>
          </label>
          <label for="inp" class="inp">
            <input
              type="password"
              name="confirmpassword"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
            />
            <span class="label">Confirmpassword</span>
            <span class="focus-bg"></span>
          </label>

          <button type="submit">signup</button>
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  gap: 1rem;
  align-items: center;
  color: black;
  /* background-color: #000000ce; */

  button {
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
      color: #4d00c2;
    }
  }

  .text {
    .mobile {
      display: none;
      a {
        color: white;
        text-decoration: none;
      }
    }
    h1 {
      font-size: 50px;
      font-weight: bold;
      width: 350px;
      font-size: 72px;
      background: -webkit-linear-gradient(gray, black);
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
      font-weight: bold;
      font-size: 30px;

      text-transform: uppercase;
      span {
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
      &:focus {
        padding-top: 1.2rem;
        border: 0.1rem solid black;
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
      padding: 1rem;
      border-bottom: 0.1rem solid black;
      border-radius: 0.4rem;
      color: gray;
      width: 100%;
      font-size: 0.7rem;
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
        transform: translate3d(0, -12px, 0) scale(0.75);
        + .focus-bg {
          transform: scaleX(1);
          transition: all 0.1s ease;
        }
      }
    }
    span {
      color: gray;
      font-size: 15;
      a {
        font-weight: bold;
        color: black;
      }
    }
  }

  @media screen and(min-width: 900px) {
    .text {
      display: none;
    }
  }
`;

export default Register;
