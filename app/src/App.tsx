import { useState } from "react";

// components
import Editor from "./components/editor";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [formData, setFormData] = useState<string>("");

  if (user === "") {
    return (
      <div className="fixed w-full flex justify-center items-center h-screen bg-white top-0 left-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUser(`${formData}-${Math.round(Math.random() * 1000)}`);
          }}
          className="flex flex-col gap-y-2 w-96"
        >
          <label htmlFor="username">Enter your name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="border-2 border-indigo-600 p-2 rounded-lg outline-none"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Enter your name to start collaborating in a room.
          </p>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 px-5 rounded-lg"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 flex flex-col h-screen">
      <h1 className="text-2xl">Type something in real-time:</h1>
      <Editor username={user} />
    </div>
  );
};

export default App;
