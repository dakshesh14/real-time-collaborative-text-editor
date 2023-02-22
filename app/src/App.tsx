import { useEffect, useRef } from "react";

// remirror
import { EmptyShape, Extension } from "remirror";
import { ReactFrameworkOutput } from "@remirror/react";

// hooks
import useWebSocket from "./hooks/use-websocket";

// components
import Editor from "./components/editor";

const App = () => {
  const { messages, sendMessage } = useWebSocket(
    "ws://localhost:8000/ws/editor/my-room/"
  );

  const editorRef = useRef<ReactFrameworkOutput<Extension<EmptyShape>> | null>(
    null
  );

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setContent(messages);
  }, [messages, editorRef]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-5">Type something in real-time:</h1>
      <Editor value={messages} onChange={sendMessage} ref={editorRef} />
    </div>
  );
};

export default App;
