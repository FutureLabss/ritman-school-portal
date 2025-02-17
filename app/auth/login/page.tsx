"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { LoginFormDataType } from "@/utils/types";
import Link from "next/link";

const Login = () => {
  const login = useAuth()?.login;
  const error = useAuth()?.error;
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation((data: LoginFormDataType) => {
    if (login) {
      return login(data);
    }
    throw new Error("Login function is not available");
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields.");
      return;
    }
    setFormError(null);
    mutation.mutate(formData);
  };
  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-8 rounded-lg mt-5 lg:mt-20">
        <div className="flex justify-start mb-10">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-6">
          Nice to have you back
        </h2>
        <form className="space-y-2 mt-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                value={formData.email}
                name="email"
                required
                onChange={handleFieldChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                value={formData.password}
                name="password"
                required
                onChange={handleFieldChange}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="text-[0.8rem] w-full flex gap-2">
              <span>Forgotten Password?</span>
              <span className="text-secondary">Reset Password</span>
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label={mutation.isLoading ? "Logging in..." : "Login"}
              onClick={handleSubmit}
              type="submit"
            />
          </div>
          <div className="text-[0.8rem] w-full flex gap-2 items-center justify-center">
            <span>Don&apos;t have an account?</span>
            <Link href="/auth/register">
              <span className="text-primary">Register</span>
            </Link>
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
