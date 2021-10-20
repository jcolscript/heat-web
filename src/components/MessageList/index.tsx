import React from "react";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

export const MessageList: React.FC = () => {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src="https://github.com/jcolscript.png" alt="José Carlos" />
            </div>
            <span>José Carlos</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src="https://github.com/jcolscript.png" alt="José Carlos" />
            </div>
            <span>José Carlos</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src="https://github.com/jcolscript.png" alt="José Carlos" />
            </div>
            <span>José Carlos</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
