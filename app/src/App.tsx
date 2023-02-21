import Editor from "./components/editor";

// hooks
import useWebSocket from "./hooks/use-websocket";

const App = () => {
  const { messages, sendMessage } = useWebSocket(
    "ws://localhost:8000/ws/editor/my-room/"
  );

  console.log(messages);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-5">Type something in real-time:</h1>
      <textarea
        value={messages}
        onChange={(e) => {
          sendMessage(e.target.value);
        }}
      >
        {messages}
      </textarea>
      {/* <Editor
        onChange={(value) => {
          sendMessage(value);
        }}
      /> */}
    </div>
  );
};

export default App;
