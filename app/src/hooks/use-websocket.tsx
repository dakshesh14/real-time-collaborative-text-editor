import { useEffect, useRef, useState, useCallback } from "react";

// TODO: not being used; remove
const useWebSocket = (url: string, user_id: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [messages, setMessages] = useState<{
    user_id: string;
    message: string;
  }>({
    user_id,
    message: "Hello World",
  } as any);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnecting(false);
      console.log("Connected to websocket");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(data);
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from websocket");
    };

    return () => socketRef.current?.close();
  }, [url]);

  const sendMessage = useCallback(
    (message: string) => {
      socketRef.current?.send(JSON.stringify({ message, user_id }));
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
