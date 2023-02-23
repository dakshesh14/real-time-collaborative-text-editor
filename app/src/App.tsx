// components
import Editor from "./components/editor";

const App = () => {
  return (
    <div className="container mx-auto py-10 flex flex-col h-screen">
      <h1 className="text-2xl mb-5">Type something in real-time:</h1>
      <Editor />
    </div>
  );
};

export default App;
