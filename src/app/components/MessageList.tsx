"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "./MessagesList.module.css";
import { pusherClient } from "@/lib/pusher";
export default function MessageList({ initialMessages, recipientId, chatId }) {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  useEffect(() => {
    console.log("chatId", chatId);
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId]);

  return messages?.map((msg, index) => (
    <div
      key={index}
      className={
        msg.senderId === recipientId
          ? styles.sentMessage
          : styles.receivedMessage
      }
    >
      <p className={styles.name}>{msg.senderName}</p>
      <p className={styles.message}>{msg.text}</p>
      <p className={styles.time}>{msg.created}</p>
    </div>
  ));
}
