import React from "react";
import { VscGithubInverted } from "react-icons/vsc";

import styles from "./styles.module.scss";

export const LoginBox: React.FC = () => {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.signinWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com Github
      </a>
    </div>
  );
};
