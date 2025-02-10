import './App.css';
import gptLogo from "./assets/chatgpt.svg";
import Home from "./assets/home.svg";
import Saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import send from "./assets/send.svg";
import gptImgLogo from "./assets/logo.JPG";
import userIcon from "./assets/chatgpt.svg";
import { sendMsgToOpenAI } from './openai';
import { useState, useEffect, useRef } from "react";

function App() {
  
  const [input, setInput] = useState("");  
  const [chats, setChats] = useState([]);  
  const messagesEndRef = useRef(null);     
  

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setChats([...chats, userMessage]);
    
    const response = await sendMsgToOpenAI(input);
    setInput("");
    
    const botMessage = { role: "bot", content: response || "Error in response" };
    
    setChats([...chats, userMessage, botMessage]);
    
    setInput("");
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);
  
  return (
    <div className="App">
    <div className="topNavBar">
      <div className="upperSideTop">
        <img src={gptLogo} alt="logo" className="logo" />
        <span className="brand">GPT - by Alok</span>
      </div>
      <div className="topNavLinks">
        <button className="topNavButton"><img src={Home} alt="Home" /> Home</button>
        <button className="topNavButton"><img src={Saved} alt="Saved" /> Saved</button>
        <button className="topNavButton"><img src={rocket} alt="Upgrade" /> Upgrade</button>
      </div>
    </div>
  
    <div className="mainChatArea">
      <div className="chatContainer">

        {chats.length === 0 ? (
          <h1 style={{ justifyItems:"center",fontSize:"50px",color: "white" }} className="txt">
            This is AlokGPT
            <h6 style={{fontSize:"20px"}}>Your Personal AI Assistant, Ready to Chat!</h6>
          </h1>
        ) : (
          chats.map((chat, index) => (
            <div key={index} className={`chat ${chat.role === "bot" ? "bot" : ""}`}>
              <img className="chatImg" src={chat.role === "bot" ? gptImgLogo : userIcon} alt="" />
              <p style={{ color: chat.role !== "bot" ? "" : "black" }} className="txt">
                {chat.content}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
  
      {/* Chat Input Area */}
      <div className="chatFooter">
        <div className="chatInput">
          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="sendBtn" onClick={handleSend}><img src={send} alt="send" /></button>
        </div>
      </div>
    </div>
  </div>
  

  );
}

export default App;
