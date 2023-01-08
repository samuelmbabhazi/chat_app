import React from "react";

const Message = ({ messages, toId, currentId, formatDateFromTimestamp }) => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2 ">
          {messages &&
            messages.map((mes, key) => {
              if (mes.to === toId && mes.from === currentId) {
                return (
                  <div
                    key={key}
                    className="col-start-1 col-end-12  rounded-br-lg"
                  >
                    <div className="flex items-center justify-start flex-row-reverse  ">
                      <div className="relative flex  gap-2 text-sm bg-black py-2 px-2 shadow rounded-xl text-white">
                        <div>{mes.message}</div>
                        <small className="text-[1Opx] mt-[0.5rem] text-[gray]">
                          {formatDateFromTimestamp(mes.date)}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              } else if (mes.to === currentId && mes.from === toId) {
                const mymes = mes.message;
                return (
                  <div
                    key={key}
                    className="col-start-2 col-end-12  rounded-bl-lg"
                  >
                    <div className="flex flex-row items-center">
                      <div className="relative flex  gap-2 text-sm bg-white py-2 px-2 shadow rounded-xl text-black">
                        <div>{mymes}</div>
                        <span className="text-[10px] mt-[0.4rem]  text-[gray]">
                          {formatDateFromTimestamp(mes.date)}
                        </span>
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
