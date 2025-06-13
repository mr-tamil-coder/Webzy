import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import { DEFAULT_FILE, DEPENDENCY } from "../../data/AiDetails";
const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(DEFAULT_FILE);
  return (
    <div>
      <div className="flex items-center flex-wrap shrink-0 bg-black">
        <h3
          className={
            activeTab === "code" ? "text-shadow-blue-400 bg-amber-100" : ""
          }
          onClick={() => setActiveTab("code")}
        >
          Code
        </h3>
        <h3
          className={
            activeTab === "preview" ? "text-shadow-blue-400 bg-amber-100" : ""
          }
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </h3>
      </div>
      <div>
        <SandpackProvider
          template="react"
          theme={"dark"}
          files={files}
          customSetup={{
            dependencies: {
              ...DEPENDENCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com",],
          }}
        >
          <SandpackLayout>
            {activeTab == "code" ? (
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
