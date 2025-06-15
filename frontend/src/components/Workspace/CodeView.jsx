import React, { useContext, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import {
  CODE_GEN_PROMPT,
  DEFAULT_FILE,
  RUNTIME_DEPENDENCIES,
} from "../../data/AiDetails";
import { MessageContext } from "../../context/MsgContext";
import axios from "axios";
import { API } from "../../utils/Api";

const CodeView = ({ workspaceId }) => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(DEFAULT_FILE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { messages, setMessages } = useContext(MessageContext);

  // Load workspace data on component mount
  useEffect(() => {
    if (workspaceId) {
      loadWorkspaceData();
    } else {
      setIsLoading(false);
    }
  }, [workspaceId]);

  // Handle new messages - Add dependency check and prevent infinite loops
  useEffect(() => {
    if (messages?.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "user" && !lastMessage.processed) {
        genAiCode();
        // Mark message as processed to prevent re-triggering
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, processed: true } : msg
          )
        );
      }
    }
  }, [messages, isLoading]); // Remove setMessages from dependencies

  // Load existing workspace data
  const loadWorkspaceData = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API}/workspace/${workspaceId}`);
      const workspace = response.data;

      if (workspace.fileData) {
        // Validate file structure before setting
        const validatedFiles = validateFiles(workspace.fileData);
        setFiles(validatedFiles);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading workspace:", error);
      setError("Failed to load workspace data");
      setIsLoading(false);
    }
  };

  // Validate file structure for Sandpack
  const validateFiles = (fileData) => {
    const validatedFiles = { ...DEFAULT_FILE };

    Object.keys(fileData).forEach((filePath) => {
      if (fileData[filePath] && typeof fileData[filePath] === "object") {
        // Handle both { code: "..." } and direct string formats
        if (fileData[filePath].code) {
          validatedFiles[filePath] = { code: fileData[filePath].code };
        } else if (typeof fileData[filePath] === "string") {
          validatedFiles[filePath] = { code: fileData[filePath] };
        }
      }
    });

    return validatedFiles;
  };

  // Save files to workspace
  const saveFilesToWorkspace = async (newFiles) => {
    if (!workspaceId) return;

    try {
      await axios.patch(`${API}/workspace/${workspaceId}/files`, {
        fileData: newFiles,
      });
    } catch (error) {
      console.error("Error saving files:", error);
      setError("Failed to save files");
    }
  };

  const genAiCode = async () => {
    const PROMPT = JSON.stringify(messages) + CODE_GEN_PROMPT.prompt;

    console.log("PROMPT", PROMPT);

    try {
      setError(null);
      const response = await axios.post(`${API}/gemini/generate-code`, {
        prompt: PROMPT,
      });

      console.log("genAiCode", response.data.output);
      const aiResponse = response.data.output;

      // Validate AI response structure
      if (!aiResponse || !aiResponse.files) {
        throw new Error("Invalid AI response format");
      }

      // Validate and merge files
      const validatedAiFiles = validateFiles(aiResponse.files);
      const mergedFiles = {
        ...DEFAULT_FILE,
        ...validatedAiFiles,
      };

      setFiles(mergedFiles);

      // Save files to workspace
      await saveFilesToWorkspace(mergedFiles);

      console.log("mergedFiles", mergedFiles);
    } catch (error) {
      console.error("Error generating AI code:", error);
      setError("Failed to generate code");
    }
  };

  // Error boundary for Sandpack
  const handleSandpackError = (error) => {
    console.error("Sandpack error:", error);
    setError("Code execution error");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading workspace...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center flex-wrap shrink-0 bg-black">
        <h3
          className={`cursor-pointer px-4 py-2 text-white ${
            activeTab === "code"
              ? "text-shadow-blue-400 bg-amber-100 text-black"
              : ""
          }`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </h3>
        <h3
          className={`cursor-pointer px-4 py-2 text-white ${
            activeTab === "preview"
              ? "text-shadow-blue-400 bg-amber-100 text-black"
              : ""
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </h3>
      </div>
      <div>
        <SandpackProvider
          template="react" // Changed from "vite" to "react" for better compatibility
          theme="dark"
          files={files}
          customSetup={{
            dependencies: {
              ...RUNTIME_DEPENDENCIES,
            },
          }}
          options={{
            externalResources: [
              "https://cdn.tailwindcss.com", // Add Tailwind CSS
            ],
          }}
        >
          <SandpackLayout>
            {activeTab === "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "80vh" }} />
                <SandpackCodeEditor
                  style={{ height: "80vh" }}
                  showTabs
                  showLineNumbers
                />
              </>
            ) : (
              <SandpackPreview
                style={{ height: "80vh" }}
                showNavigator={true}
                showOpenInCodeSandbox={false}
                onError={handleSandpackError}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default CodeView;
