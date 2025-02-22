"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "@/utils/api";
import { IUser } from "@/utils/types";

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Safely get user from localStorage
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user?.token) {
          api.defaults.headers.Authorization = `Bearer ${user.token}`;
          const response = await api.get("/student/me");

          if (response.status === 200) {
            const userData: IUser = { ...response.data.data };
            setUser(userData);
          }
        } else {
          setError("No user token found");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            // Handle unauthorized error (e.g., clear token and redirect to login)
            localStorage.removeItem("user");
            setUser(null);
            setError("Session expired. Please log in again.");
          } else {
            setError(
              error.response
                ? error.response.data.message || "An error occurred"
                : "An unknown error occurred"
            );
          }
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}