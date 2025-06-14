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

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(DEFAULT_FILE);

  const { messages, setMessages } = useContext(MessageContext);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role === "user") {
        genAiCode();
      }
    }
  }, [messages]);

  const genAiCode = async () => {
    const PROMPT =
      messages[messages.length - 1]?.content + CODE_GEN_PROMPT.prompt;

    try {
      const response = await axios.post(`${API}/gemini/generate-code`, {
        prompt: PROMPT,
      });

      console.log("genAiCode", response.data.output);
      const aiResponse = response.data.output;

      const mergedFiles = {
        ...DEFAULT_FILE,
        ...aiResponse.files,
      };

      setFiles(mergedFiles);
      console.log("mergedFiles", mergedFiles);
    } catch (error) {
      console.error("Error generating AI code:", error);
    }
  };

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
          template="react"
          theme="dark"
          files={files}
          customSetup={{
            dependencies: {
              ...RUNTIME_DEPENDENCIES,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          // //   bundlerURL: "https://sandpack-bundler.codesandbox.io",
          //   startRoute: "/",
          //   recompileMode: "delayed",
          //   recompileDelay: 300,
          //
        >
          <SandpackLayout>
            {activeTab === "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "80vh" }} />
                <SandpackCodeEditor style={{ height: "80vh" }} />
              </>
            ) : (
              <>
                <SandpackPreview
                  style={{ height: "80vh" }}
                  showNavigator={true}
                />
              </>
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default CodeView;
