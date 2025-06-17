import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { API } from "../../utils/Api";
import axios from "axios";
import { MessageContext } from "../../context/MsgContext";
import { userContext } from "../../context/UserContext";
import { PROMPT_FOR_AI } from "../../data/prompt";
import { Loader2Icon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { countTokens } from "../../utils/helper";
const ChatView = () => {
  const { id } = useParams();
  const { messages, setMessages } = useContext(MessageContext);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [userInput, setUserInput] = useState("");
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const isProcessingRef = useRef(false);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load workspace messages on mount
  useEffect(() => {
    if (id && !initialLoadDone) {
      getWorkspaceDetailById(id);
    }
  }, [id, initialLoadDone]);

  // Handle AI response after user message
  useEffect(() => {
    if (!initialLoadDone || isProcessingRef.current) return;

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        getAiResponse();
      }
    }
  }, [messages, initialLoadDone]);

  async function getWorkspaceDetailById(workspaceId) {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/workspace/${workspaceId}`);
      const receivedMessages = Array.isArray(response.data?.messages)
        ? response.data.messages
        : [];

      console.log("Loaded messages:", receivedMessages);
      setMessages(receivedMessages);
      setInitialLoadDone(true);
    } catch (error) {
      console.error("Error loading workspace:", error);
      setMessages([]);
      setInitialLoadDone(true);
    } finally {
      setLoading(false);
    }
  }

  // Save single message to workspace using PATCH
  async function saveMessageToWorkspace(message) {
    if (!id) return;

    try {
      await axios.patch(`${API}/workspace/${id}/message`, {
        role: message.role,
        content: message.content,
        timestamp: message.timestamp,
      });
      console.log("Message saved to workspace");
    } catch (error) {
      console.error("Error saving message:", error);
    }
  }

  async function getAiResponse() {
    if (isProcessingRef.current || loading) return;

    isProcessingRef.current = true;
    setLoading(true);

    try {
      const promptFinal = JSON.stringify(messages) + PROMPT_FOR_AI;
      console.log("Sending prompt:", promptFinal);

      const response = await axios.post(`${API}/gemini/ask`, {
        prompt: promptFinal,
      });

      console.log("AI response:", response);

      const aiMessage = {
        role: "ai",
        content: response.data.output,
        timestamp: new Date().toISOString(),
      };

      // Add AI message to local state
      setMessages((prev) => [...prev, aiMessage]);

      countTokens(JSON.stringify(aiMessage));
      // Save AI message to workspace
      await saveMessageToWorkspace(aiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message to chat
      const errorMessage = {
        role: "ai",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      await saveMessageToWorkspace(errorMessage);
    } finally {
      setLoading(false);
      isProcessingRef.current = false;
    }
  }

  async function onGenerate() {
    if (!userInput.trim() || loading || isProcessingRef.current) return;

    const userMessage = {
      role: "user",
      content: userInput.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message to local state
    setMessages((prev) => [...prev, userMessage]);

    // Clear input immediately for better UX
    setUserInput("");

    // Save user message to workspace
    await saveMessageToWorkspace(userMessage);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  if (!initialLoadDone) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <span>Loading workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <h3 className="text-xl font-semibold">ChatView</h3>
        {userInfo?.firstName && (
          <div className="flex items-center gap-2 mt-2">
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm text-gray-600">{userInfo.firstName}</p>
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={`${message.timestamp || index}-${message.role}`}
              className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 shadow-sm border"
                }`}
              >
                {message.role === "ai" && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">AI</span>
                    </div>
                  </div>
                )}
                <ReactMarkdown className="whitespace-pre-wrap">
                  {message.content}
                </ReactMarkdown>
                {message.timestamp && (
                  <p className="text-xs mt-1 opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              No messages yet. Start a conversation!
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 shadow-sm border max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2Icon className="animate-spin w-4 h-4" />
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <textarea
            placeholder="Type your message... (Shift+Enter for new line)"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            rows={1}
            style={{
              minHeight: "48px",
              maxHeight: "120px",
            }}
          />
          <button
            className={`px-6 py-3 rounded-lg font-medium ${
              userInput.trim() && !loading
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={onGenerate}
            disabled={!userInput.trim() || loading}
          >
            {loading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
