import React from "react";
import ChatView from "./ChatView";
import CodeView from "./CodeView";

const WorkSpace = () => {
  return (
    <div className="p-10">
      workspace
      <div className="grid grid-cols-1 md:grid-cols-4">
        <ChatView />
        <div className="col-span-3">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
