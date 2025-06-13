import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../utils/Api";
import axios from "axios";
import { useEffect } from "react";
import { MessageContext } from "../../context/MsgContext";
import { userContext } from "../../context/UserContext";
const ChatView = () => {
  const { id } = useParams();
  const { messages, setMessages } = useContext(MessageContext);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    id && getWorkspaceDetailById(id);
  }, [id]);
  console.log("UserInfo", userInfo);

  async function getWorkspaceDetailById(id) {
    try {
      const response = await axios.get(`${API}/workspace/${id}`);
      const receivedMessages = Array.isArray(response.data?.messages)
        ? response.data.messages
        : [];
      console.log("helo", receivedMessages);
      setMessages(receivedMessages);
    } catch (error) {
      setMessages([]);
      console.log(error);
    }
  }

  return (
    <div>
      <h3>ChatView</h3>

      {userInfo?.firstName && (
        <div className="flex items-center gap-2 mb-4">
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-lg font-semibold">{userInfo.firstName}</p>
        </div>
      )}

      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="bg-green-200 p-3 my-2 rounded">
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No messages yet.</p>
      )}
      {/* input msg from box */}
      <div className="flex items-center gap-2 mt-4 fixed bottom-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            const newMessage = {
              content: userInput,
              sender: userInfo,
            };
            setMessages([...messages, newMessage]);
            setUserInput("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatView;
