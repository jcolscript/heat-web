import React, { createContext, useEffect, useState } from "react";

import { client } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`;

  async function signIn(githubCode: string) {
    const response = await client.post<AuthResponse>("auth", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@heat:token", token);

    client.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@heat:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@heat:token");

    if (token) {
      client.defaults.headers.common.authorization = `Bearer ${token}`;

      client.get<User>("profile").then((resp) => {
        setUser(resp.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");
      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
