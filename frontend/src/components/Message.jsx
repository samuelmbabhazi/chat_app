import React from "react";

const Message = ({ message }) => {
  return (
    <>
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-12 gap-y-2">
          {/* {message &&
            message.map((mes, key) => { */}

          <div class="col-start-1 col-end-8 p-3 rounded-lg">
            <div class="flex flex-row items-center">
              <div class="relative ml-3 text-sm bg-[#f0f0f0] py-2 px-4 shadow rounded-xl">
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                  fugit ut provident non vitae, doloribus quasi
                </div>
              </div>
            </div>
          </div>

          {/* })}
          {message &&
            message.map((mes, key) => { */}

          <div class="col-start-6 col-end-13 p-3 rounded-lg">
            <div class="flex items-center justify-start flex-row-reverse gap-3 ">
              <div class="relative ml-3 text-sm bg-[#d5ebff] py-2 px-4 shadow rounded-xl">
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                  qui possimus facere atque recusandae nostrum libero
                </div>
              </div>
            </div>
          </div>

          {/* })} */}
        </div>
      </div>
    </>
  );
};

export default Message;
