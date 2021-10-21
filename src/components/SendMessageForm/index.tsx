import React, { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

//limitar textarea em 170

import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/auth";
import { client } from "../../services/api";

export const SendMessageForm: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await client.post("messages", { message });

    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual é sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          maxLength={170}
        ></textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
};
