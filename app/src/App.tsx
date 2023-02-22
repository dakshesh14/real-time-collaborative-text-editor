import { useEffect, useRef } from "react";

// remirror
import { EmptyShape, Extension } from "remirror";
import { ReactFrameworkOutput } from "@remirror/react";

// hooks
import useWebSocket from "./hooks/use-websocket";

// components
import Editor from "./components/editor";
import Spinner from "./components/spinner";

const user_id = `user-${Math.floor(Math.random() * 1000)}`;

const App = () => {
  const { messages, sendMessage, isConnecting } = useWebSocket(
    "ws://localhost:8000/ws/editor/my-room/", // TODO: make this dynamic
    user_id
  );

  const editorRef = useRef<ReactFrameworkOutput<Extension<EmptyShape>> | null>(
    null
  );

  useEffect(() => {
    if (!editorRef.current) return;
    // FIXME: this feels hacky; using it to update the editor's content
    if (user_id !== messages.user_id)
      editorRef.current.setContent(messages.message);
  }, [messages, editorRef]);

  if (isConnecting)
    return (
      <div className="w-full h-screen flex gap-y-5 flex-col items-center justify-center">
        <Spinner />
        <h2 className="text-2xl">
          Connecting to websocket... (it may not even connect)
        </h2>
        <a href="/">
          <button
            type="button"
            className="p-4 bg-indigo-600 py-2 rounded text-white"
          >
            Reload
          </button>
        </a>
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-5">Type something in real-time:</h1>
      <Editor value={messages.message} onChange={sendMessage} ref={editorRef} />
    </div>
  );
};

export default App;
