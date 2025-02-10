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
  const [loading, setLoading] = useState(false);  // Loader state

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };

    setChats((prevChats) => [...prevChats, userMessage]);
    setInput(""); // Clear input immediately

    setLoading(true); // Show loader

    try {
      const response = await sendMsgToOpenAI(input);

      const botMessage = { role: "bot", content: response || "Error in response" };

      setChats((prevChats) => [...prevChats, botMessage]);
    } catch (error) {
      setChats((prevChats) => [...prevChats, { role: "bot", content: "Error fetching response." }]);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, loading]);

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
            <h1 style={{ justifyItems:"center", fontSize:"50px", color: "white" }} className="txt">
              This is AlokGPT
              <h6 style={{ fontSize:"20px" }}>Your Personal AI Assistant,  Ready to Chat!</h6>
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

          {/* Show loader while waiting for response */}
          {loading && (
            <div className="chat bot">
              <img className="chatImg" src={gptImgLogo} alt="bot" />
              <p className="txt" style={{ color: "black" }}>Typing...</p>
            </div>
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
              disabled={loading} // Disable input while loading
            />
            <button className="sendBtn" onClick={handleSend} disabled={loading}>
              {loading ? "..." : <img src={send} alt="send" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
