import React, { useContext, useEffect } from "react";
import ChatView from "./ChatView";
import CodeView from "./CodeView";
import { useParams } from "react-router";
import { MessageContext } from "../../context/MsgContext";
const WorkSpace = () => {
  const { id } = useParams();

  return (
    <div className="p-10">
      workspace
      <div className="grid grid-cols-1 md:grid-cols-4">
        <ChatView />
        <div className="col-span-3">
          <CodeView workspaceId={id} />
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
