import React from "react";

const Users = ({ myusers, changeChat, messages }) => {
  return (
    <div
      id="contact"
      className="flex flex-col space-y-1 mt-4 -mx-2 h-96 max-[620px]:h-5/6 z-20 overflow-y-auto "
    >
      {myusers &&
        myusers.map((name, index) => {
          return (
            <button
              key={index}
              onClick={() => changeChat(name._id, name.username)}
              className="flex flex-row items-center hover:border-b-2 hover:border-black border-b-[1px] border-[#f5f5f5]  p-2"
            >
              <div className="flex items-center justify-center h-8 w-8 max-[620px]:h-12 max-[620px]:w-12 bg-black rounded-full text-white">
                {name.username[0]?.toUpperCase()}
              </div>
              <div className="ml-2 text-sm font-semibold">
                {name.username}
                <br />
              </div>
            </button>
          );
        })}
    </div>
  );
};

export default Users;
