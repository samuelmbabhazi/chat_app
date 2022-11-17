import React from "react";
import Input from "./Input";

const Message = ({ messages, toId, currentId }) => {
  return (
    <>
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-12 gap-y-2">
          {messages &&
            messages.map((mes, key) => {
              if (mes.to === toId && mes.from === currentId) {
                return (
                  <div key={key} class="col-start-6 col-end-13 p-3 rounded-lg">
                    <div class="flex items-center justify-start flex-row-reverse gap-3 ">
                      <div class="relative ml-3 text-sm bg-black py-2 px-4 shadow rounded-xl text-white">
                        <div>{mes.message}</div>
                      </div>
                    </div>
                  </div>
                );
              } else if (mes.to === currentId && mes.from === toId) {
                const mymes = mes.message;
                return (
                  <div key={key} class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div class="flex flex-row items-center">
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl text-black">
                        <div>{mymes}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Message;
