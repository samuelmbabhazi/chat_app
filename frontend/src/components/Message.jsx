import React from "react";
import Input from "./Input";

const Message = () => {
  return (
    <>
      <div class="flex flex-col flex-auto h-full p-6 ">
        <div class="flex flex-col flex-auto flex-shrink-0  bg-[ #000000ce] h-full p-4">
          <div id="contact" class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      <img
                        src="A.svg"
                        alt="Avatar"
                        class="h-full w-full rounded-full"
                      />
                    </div>
                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse gap-3 ">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 ">
                      <img
                        src="A.svg"
                        alt="Avatar"
                        class="h-full w-full rounded-full"
                      />
                    </div>
                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Input />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
