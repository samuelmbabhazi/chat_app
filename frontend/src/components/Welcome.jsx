import React from "react";

const Welcome = () => {
  return (
    <>
      <div className="flex flex-col mx-[25%] my-[12%] h-full">
        <img src="s1.svg" alt="" width={300} />
        <p>
          Welcome to{" "}
          <span className="font-bold text-[black]">
            GOCHAT<sup>42</sup>
          </span>
          <br />
          send and receive your messages
        </p>
      </div>
    </>
  );
};

export default Welcome;
