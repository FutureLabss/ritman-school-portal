"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "@/utils/api"; // Ensure this is the correct path to your api.ts file
import { getErrorMessage } from "@/utils/errorHandler";
import {
  CreatePasswordFormDataType,
  RegisterFormDataType,
  ResendEmailDataType,
  LoginFormDataType,
  verificationCodeDataType,
  UserDataTypes,
} from "@/utils/types";
import { useRouter } from "next/navigation";

// Define User Type

interface AuthContextType {
  user: UserDataTypes | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  login: (credentials: LoginFormDataType) => Promise<void>;
  logout: () => void;
  register: (data: RegisterFormDataType) => Promise<void>;
  verifyEmail: (verificationCode: verificationCodeDataType) => Promise<void>;
  createPassword: (data: CreatePasswordFormDataType) => Promise<void>;
  resendEmail: (data: ResendEmailDataType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDataTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register User
  const register = async (data: RegisterFormDataType) => {
    setLoading(true);
    setError(null);
    localStorage.setItem("userReg", JSON.stringify(data));
    try {
      const response = await api.post("/auth/register", data);
      if (response.status === 200) {
        router.push("/auth/verify");
      }
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code: verificationCodeDataType) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post("/auth/verify/email", code);
      if (response.status === 200) {
        router.push("/auth/create-password");
      }
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const createPassword = async (data: CreatePasswordFormDataType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/complete-registration", data);

      if (response.status === 201) {
        const { token, fullname, roles } = response.data.data;

        // Store user info
        const userData: UserDataTypes = { fullname, roles, token };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/student-application");
      }
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendEmail = async (data: ResendEmailDataType) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post("/auth/resend/email/verification", data);
      if (response.status === 200) {
        setSuccess("Verification code sent successfully.");
      }
      setLoading(false);
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const login = async (credentials: LoginFormDataType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, fullname, roles } = response.data.data;

      // Store user info
      const userData: UserDataTypes = { fullname, roles, token };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      if (response.status === 200) {
        router.push("/student/dashboard");
      }

      // Set auth token globally for future API calls
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? getErrorMessage(error.response)
            : "An unknown error occurred."
        );
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        success,
        login,
        logout,
        register,
        verifyEmail,
        createPassword,
        resendEmail,
      }}
    >
      {children}
      {/* {error && <div className="error">{error}</div>} */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
