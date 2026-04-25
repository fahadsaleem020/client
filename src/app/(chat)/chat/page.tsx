"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useSound from "use-sound";
import { useUser } from "@/providers/user.provider";
import { useSocket } from "@/store/socket.store";
import { Message, MessageAvatar, MessageContent } from "@/ui/message";
import Navbar from "@/ui/navbar";
import { Online } from "@/ui/online";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { TextShimmer } from "@/ui/text-shimmer";
import PromptInputElement from "../components/promptelement";

export default function ChatPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playNotification] = useSound("/message.mp3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{ message: string; type?: "user" }[]>([]);

  const { isLoading, data } = useUser();
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (data?.session.id) {
      socket.auth = { sessionId: data?.session.id };

      // Only connect if not already connected
      if (!socket.connected) {
        socket.connect();
      }
    }
    socket.on("connect_error", (error) => {
      toast.error(error?.message);
    });

    socket.once("connect", () => {
      toast.success("Socket handshake successful");
    });

    socket.on("disconnect", (reason) => {
      toast.info(`Socket disconnected: ${reason}`);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [socket, data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, scrollRef, isProcessing]);

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/signin");
    }
  }, [data, isLoading, router]);

  useEffect(() => {
    socket.on("response-message", (message: string) => {
      setIsProcessing(false);
      setMessages((p) => [...p, { message }]);
      playNotification();
    });

    return () => {
      socket.off("response-message");
    };
  }, [socket, playNotification]);

  const sendMessageHandler = (message: string) => {
    setIsProcessing(true);
    setMessages((p) => [...p, { message, type: "user" }]);
    socket.emit("send-message", { data, message });
  };

  return (
    <Online fallback="">
      <div className="h-dvh flex flex-col mx-auto w-full md:w-2xl md:px-3 p-2 md:py-5 gap-5">
        <Navbar className="w-full!" />

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full px-3">
            <div className="space-y-3">
              {messages.map(({ message, type }, key) => (
                <MessageContainer key={key} message={message} type={type} />
              ))}
              <div ref={scrollRef} className="h-1" />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

        <PromptInputElement onSubmit={sendMessageHandler} isLoading={isProcessing}>
          <TextShimmer className="text-sm">Thinking...</TextShimmer>
        </PromptInputElement>
      </div>
    </Online>
  );
}

function MessageContainer({ type, message }: { type: "user" | undefined; message: string }) {
  return (
    <Message className={type === "user" ? "justify-start mr-5" : "justify-end ml-5"}>
      {!type && <MessageAvatar src={"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Ryan"} alt="Avatar" fallback="AI" />}
      <MessageContent markdown className={type === "user" ? "bg-secondary/20" : "bg-indigo-500/20"}>
        {message}
      </MessageContent>
    </Message>
  );
}
