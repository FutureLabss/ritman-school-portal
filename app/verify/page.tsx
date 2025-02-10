"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleVerification = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-8 rounded-lg mt-5 lg:mt-20">
        <div className="flex justify-start mb-10">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-10">Verification</h2>
        <form className="space-y-6">
          <div>
            <span className="text-[0.9rem]">
              A verification code has been sent to
            </span>{" "}
            <span className="font-bold text-[1rem]">
              VictorIm*****@gmail.com
            </span>
          </div>
          <div className="grid lg:grid-cols-2 content-center gap-2">
            <div>
              <label className="block text-[0.8rem] font-bold mb-1 text-secondary">
                A code is sent to your email. Enter the code here
              </label>
              <Input
                value={verificationCode}
                onChange={handleInputField}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center mt-5 font-bold">
              <p className="text-[0.9rem] w-full cursor-pointer">Resend Code</p>
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label="Verify"
              onClick={handleVerification}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
