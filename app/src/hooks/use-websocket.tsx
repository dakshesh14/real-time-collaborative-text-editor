import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string>("Hello World!");

  const sendMessage = (message: string) => {
    const socket = new WebSocket(url);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "message",
          message,
        })
      );
    };
  };

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Connected to websocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).message;
      setMessages(data);
    };

    socket.onclose = () => {
      console.log("Disconnected from websocket");
    };

    return () => socket.close();
  }, [url]);

  return {
    messages,
    sendMessage,
  } as const;
};

export default useWebSocket;
