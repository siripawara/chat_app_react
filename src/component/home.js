import React, { useState, useEffect, useRef } from "react";
import db from "../firebase";
import { ref, set, onValue, push } from "firebase/database";

const Home = () => {
  const d = new Date();
  const divEle = useRef(null);
  const msgRef = ref(db, "users/");
  const newMsgref = push(msgRef);

  useEffect(() => {
    onValue(msgRef, (snapshot) => {
      let data = snapshot.val();
      setallmsg(Object.values(data));
      console.log(Object.values(data));
      setTimeout(scrollToBottom, 1000);
    });
    setTimeout(scrollToBottom, 1200);
  }, []);

  const [msgInput, setMsgInput] = useState("");
  const [username, setUsername] = useState("");
  const [allmsg, setallmsg] = useState([]);

  const addNewMsg = (Input,name) => {
    set(newMsgref, {
      msg2: name+" : "+Input,
      time : d.getHours() + " : "+ d.getMinutes(),
      id: 2,
    }).then(() => {
      setMsgInput("");

      scrollToBottom();
    });
  };

  const scrollToBottom = () => {
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'auto'
    // });
    divEle.current.scrollTop = divEle.current.scrollHeight;
    console.log("s");
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col border-0 bg-slate-700 border-black  overflow-hidden ">
        <div className="bg-gray-900 drop-shadow-lg flex flex-col shadow-2xl p-4"><h1 className="text-2xl font-bold text-white">Global Chat App</h1><span className="text-sm text-right text-gray-500 ">2.0</span></div>
        <div
          className="w-96 overflow-y-auto m-auto  border-0 border-black scroll-smooth mt-6 pl-2 pr-3"
          ref={divEle}
        >
          {allmsg ? (
            allmsg.map((msg) => {
              return <div className="flex items-baseline justify-between" ><span className="text-lg text-left text-gray-300 flex justify-items-start ">{msg.msg2}</span>
              <span className="text-sm text-right text-gray-500 flex justify-items-start ">{msg.time}</span></div>;

            })
          ) : (
            <></>
          )}
        </div>
        <div className="drop-shadow-lg flex flex-col">
        <input
          placeholder="Your Name Here"
          className="border-gray-500   bg-gray-500 text-center  text-gray-300 font-semibold border-2 mx-auto my-3 rounded-xl"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        ></input>


        <input
        placeholder="Type Your Messege Here"
          className="border-gray-500 border-2 w-3/4 pl-3  text-lg text-gray-300  h-10 mx-auto my-3  bg-gray-500 rounded-xl"
          value={msgInput}
          onInput={(e) => {
            setMsgInput(e.target.value);
          }}
        ></input>

        <button className="bg-gray-800 w-32  mx-auto p-2 rounded-2xl "
          onClick={() => {
            msgInput ? (
              username ? 
              addNewMsg(msgInput,username) : window.alert("please enter your name before send messeges")
              ) : (<></>);
          }}
          
        >
          <span className="text-gray-300 text-xl">Send</span>
        </button>
        </div>
        <div className="pt-20 pb-4">
          <p className="text-gray-500">Developed by Siripawara Madurasinghe</p>
        </div>
      </div>
    </>
  );
};

export default Home;
