import { useEffect, useRef, useState, useCallback } from "react";

const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [messages, setMessages] = useState<string>("Hello World!");

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnecting(false);
      console.log("Connected to websocket");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data).message;
      setMessages(data);
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from websocket");
    };

    return () => socketRef.current?.close();
  }, [url]);

  const sendMessage = useCallback(
    (message: string) => {
      socketRef.current?.send(JSON.stringify({ message }));
    },
    [socketRef]
  );

  return {
    isConnecting,
    messages,
    sendMessage,
  } as const;
};

export default useWebSocket;
