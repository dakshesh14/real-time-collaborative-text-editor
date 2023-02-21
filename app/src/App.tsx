import Editor from "./components/editor";

const App = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-5">Type something in real-time:</h1>
      <Editor
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

export default App;
