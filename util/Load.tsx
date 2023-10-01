import React from "react";
import Spinner from "@/components/Spinner";

interface LoadProps {
  children: React.ReactNode;
  waitingNode: any;
}

export default function Load({ children, waitingNode }: LoadProps) {
  return (
    (Array.isArray(waitingNode) && waitingNode.length > 0 ? (
      children
    ) : (
      <Spinner />
    )) || (waitingNode ? children : <Spinner />)
  );
}
