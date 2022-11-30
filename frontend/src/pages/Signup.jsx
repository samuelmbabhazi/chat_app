import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import { registerRouter } from "../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { password, username, email } = values;
    if (
      values.password.trim() !== "" &&
      values.username.trim() !== "" &&
      values.email.trim() !== ""
    ) {
      const { data } = await axios.post(registerRouter, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        showToastMessageFailed("Error");
      } else {
        showToastMessage("Success");
        navigate("/login");
      }
    } else {
      showToastMessageFailed("Complete all fields");
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
          <p></p>
          <img src="s2.svg" alt="" width={500} />
        </div>

        <form id="form" onSubmit={(event) => handleSubmit(event)}>
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
              placeholder="&nbsp;"
              required
            />
            <span className="label">Username</span>
            <span className="focus-bg"></span>
          </label>
          <label for="inp" className="inp">
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
              required
            />
            <span className="label">Email</span>
            <span className="focus-bg"></span>
          </label>
          <label for="inp" className="inp">
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
              required
            />
            <span className="label">Password</span>
            <span className="focus-bg"></span>
          </label>
          <label for="inp" className="inp">
            <input
              type="password"
              name="confirmpassword"
              onChange={(e) => handleChange(e)}
              placeholder="&nbsp;"
              required
            />
            <span className="label">Confirmpassword</span>
            <span className="focus-bg"></span>
          </label>

          <button type="submit">signup</button>
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;

  height: 90vh;
  width: 80vw;
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
      color: black;
    }
  }

  .text {
    padding: 27px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .mobile {
      display: none;
      a {
        color: white;
        text-decoration: none;
      }
    }
    h1 {
      font-size: 70px;
      font-weight: bold;
      width: 350px;
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
      padding: 0.7rem;
      border-bottom: 0.1rem solid black;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      line-height: 2rem;
      font-size: 1rem;
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

export default Register;
