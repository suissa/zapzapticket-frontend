import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {

  function login({email, password}) {
    console.log("login email", email)
    console.log("login password", password)
    return fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  // Função para criar um cabeçalho de autenticação
  function getAuthHeader() {
    const token = getToken();
    console.log("getAuthHeader token", token)
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    login,
    getToken,
    getAuthHeader
  }
}

export function useIsAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token expirado
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (e) {
        router.push("/login");
      }
    } else {
      // Token não existe
      router.push("/login");
    }
  }, [router]);
}