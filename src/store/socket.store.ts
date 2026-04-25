import { io, type Socket } from "socket.io-client";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface SocketStore {
  socket: Socket;
}

const store: StateCreator<SocketStore> = () => ({
  socket: io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN, {
    autoConnect: false,
    withCredentials: true,
  }),
});

export const useSocket = create(
  devtools<SocketStore>(store, {
    enabled: process.env.NODE_ENV === "development",
    store: "socket",
  }),
);
