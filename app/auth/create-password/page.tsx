"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { CreatePasswordFormDataType } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";

const CreatePassword = () => {
  const createPassword = useAuth()?.createPassword;
  const error = useAuth()?.error;
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreatePasswordFormDataType>({
    first_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userReg") || "{}");
    setFormData((prevData) => ({
      ...prevData,
      first_name: userData.first_name || "",
      email: userData.email || "",
    }));
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation((data: CreatePasswordFormDataType) => {
    if (createPassword) {
      return createPassword(data);
    }
    throw new Error("Create password function is not available");
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!formData.password || !formData.confirm_password) {
      setFormError("Please fill in all fields.");
      return;
    }
    setFormError(null);
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-8 rounded-lg mt-5 lg:mt-20">
        <div className="flex justify-start mb-10">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-6">
          Create Password
        </h2>
        <form className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <Input
                name="first_name"
                value={formData.first_name}
                disabled
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                name="email"
                value={formData.email}
                disabled
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Set Password
              </label>
              <Input
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handlePasswordChange}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-[0.7rem] w-full italic">
              Use at least 8 characters, including uppercase, lowercase,
              numbers, and special characters.
            </p>
          </div>

          <div className="flex justify-start mt-4">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label={mutation.isLoading ? "Creating..." : "Create Password"}
              onClick={handleSubmit}
              type="submit"
              disabled={mutation.isLoading}
            />
          </div>
          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
