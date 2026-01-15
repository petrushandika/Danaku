"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/store/use-auth-store";
import { useNotificationsStore } from "@/store/use-notifications-store";
import { toast } from "sonner";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuthStore();
  const { addNotification } = useNotificationsStore();

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000";
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected");
      // Join user specific room
      newSocket.emit("join", user.id);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    newSocket.on("notification", (data: any) => {
      console.log("New notification received:", data);

      // Add to store
      addNotification(data);

      // Show toast alert
      toast(data.title || "Notification", {
        description: data.message,
        action:
          data.type === "PAYMENT"
            ? {
                label: "View",
                onClick: () => (window.location.href = "/subscription"),
              }
            : undefined,
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, addNotification]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
