import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { toTargetUser } = useParams();
  const [messages, setMessages] = useState([
    {
      message: "Hy Samir How are u ?",
    },
    {
      message: "Will u come tommorrow",
    },
  ]);
  return (
    <div className="w-full">
      <div className="w-[50%] mx-auto">
        <div className="text-center font-semibold my-4 text-3xl text-white">
          Chat
        </div>

        <div className="h-[70vh] p-2 rounded-md bg-slate-800 overflow-y-auto flex flex-col justify-end  gap-1">
          {messages?.map((mes, index) => {
            return (
              <div key={index} className="w-full flex justify-start">
                <h1 className="px-2 py-1 text-white rounded-xl max-w-[60%] break-words  bg-green-800">
                  {mes.message}
                </h1>
              </div>
            );
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <input
            className="p-2 outline-none rounded-l-md w-full font-semibold my-2"
            type="text"
          />
          <button className="p-2 px-4 rounded-r-md font-semibold text-white my-2 bg-green-950">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
