import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { client } from "../../services/api";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    client.get<Message[]>("messages").then((resp) => {
      setMessages(resp.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map((message, index) => {
          return (
            <li className={styles.message} key={index}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImg}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
