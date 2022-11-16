import React from "react";
import Input from "./Input";

const Message = ({ message }) => {
  return (
    <>
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-12 gap-y-2">
          {message &&
            message.map((mes, key) => {
              return (
                <div key={key} class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      <img
                        src="A.svg"
                        alt="Avatar"
                        class="h-full w-full rounded-full"
                      />
                    </div>
                    <div class="relative ml-3 text-sm bg-[#f0f0f0] py-2 px-4 shadow rounded-xl">
                      <div>{mes.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          {message &&
            message.map((mes, key) => {
              return (
                <div key={key} class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse gap-3 ">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 ">
                      <img
                        src="A.svg"
                        alt="Avatar"
                        class="h-full w-full rounded-full"
                      />
                    </div>
                    <div class="relative ml-3 text-sm bg-[#d5ebff] py-2 px-4 shadow rounded-xl">
                      <div>{mes.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Message;
