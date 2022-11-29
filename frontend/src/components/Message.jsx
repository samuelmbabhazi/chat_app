import React from "react";

const Message = ({
  messages,
  toId,
  currentId,
  toUser,
  formatDateFromTimestamp,
}) => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          {messages &&
            messages.map((mes, key) => {
              if (mes.to === toId && mes.from === currentId) {
                return (
                  <div key={key} className="col-start-6 col-end-13  rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse gap-3 ">
                      <div className="relative ml-3 text-sm bg-black py-2 px-4 shadow rounded-xl text-white">
                        <div>{mes.message}</div>
                        <span className="text-[10px] text-[gray]">
                          {formatDateFromTimestamp(mes.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              } else if (mes.to === currentId && mes.from === toId) {
                const mymes = mes.message;
                return (
                  <div key={key} className="col-start-1 col-end-8  rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl text-black">
                        <div>{mymes}</div>
                        <span className="text-[10px] text-[gray]">
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
