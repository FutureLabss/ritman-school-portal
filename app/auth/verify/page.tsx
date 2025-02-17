"use client";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { ResendEmailDataType, verificationCodeDataType } from "@/utils/types";

const VerifyEmail = () => {
  const authContext = useAuth();
  const verifyEmail = authContext?.verifyEmail;
  const resendEmail = authContext?.resendEmail;
  const success = authContext?.success;
  const error = authContext?.error;
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timer, setTimer] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userReg") || "{}");
    setEmail(userData.email || "");
  }, []);

  const maskedEmail = email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => {
    return gp2 + "*".repeat(gp3.length - 4) + gp3.slice(-4);
  });

  const handleInputField =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value) && value.length <= 1) {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Move to the next input field
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setVerificationCode(newCode);
      inputRefs.current.forEach((input, index) => {
        if (input) {
          input.value = newCode[index];
        }
      });
      handleVerification({ code: newCode.join("") });
    }
  };

  const mutation = useMutation((code: verificationCodeDataType) => {
    if (verifyEmail) {
      return verifyEmail(code);
    }
    throw new Error("Verify email function is not available");
  });

  const mutationResend = useMutation((data: ResendEmailDataType) => {
    if (resendEmail) {
      return resendEmail(data);
    }
    throw new Error("Resend email function is not available");
  });

  const handleVerification = (data: verificationCodeDataType) => {
    const verificationCodeStr = data.code || verificationCode.join("");
    mutation.mutate(
      { code: verificationCodeStr },
      {
        onSuccess: (): void => {},
      }
    );
  };

  const handleResendEmail = (data: ResendEmailDataType) => {
    setVerificationCode(["", "", "", "", "", ""]);
    mutationResend.mutate(data, {
      onSuccess: (): void => {
        setTimer(30);
      },
    });
  };

  useEffect(() => {
    if (verificationCode.join("").length === 6) {
      handleVerification({ code: verificationCode.join("") });
    }
  }, [verificationCode]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="flex justify-center min-h-screen bg-white overflow-x-hidden">
      <div className="w-full max-w-4xl p-4 lg:p-8 rounded-lg mt-5 lg:mt-20">
        <div className="flex justify-start mb-10">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-10">Verification</h2>
        <form className="space-y-6">
          <div>
            <span className="text-[0.9rem]">
              A verification code has been sent to
            </span>{" "}
            <span className="font-bold text-[1rem]">{maskedEmail}</span>
          </div>
          <div className="grid lg:grid-cols-2 content-center">
            <div>
              <label className="block text-[0.8rem] font-bold mb-1 text-secondary">
                A code is sent to your email. Enter the code here
              </label>
              <div className="flex space-x-2">
                {verificationCode.map((digit: string, index: number) => (
                  <Input
                    key={index}
                    value={digit}
                    required
                    onChange={handleInputField(index)}
                    onPaste={handlePaste}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center mt-5 font-bold">
              <p
                className={`text-[0.9rem] w-full cursor-pointer ${
                  timer > 0 ? "text-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  timer === 0 && handleResendEmail({ email: email })
                }
              >
                {timer > 0 ? `Resend Code in ${timer}s` : "Resend Code"}
              </p>
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <Button
              className="px-8 py-3 bg-primary min-w-[100%] lg:min-w-[30%] text-white rounded-full hover:bg-[#0F1739] transition-all"
              label={mutation.isLoading ? "Verifying..." : "Verify"}
              onClick={() =>
                handleVerification({ code: verificationCode.join("") })
              }
              disabled={
                mutation.isLoading || verificationCode.join("").length < 6
              }
              type="submit"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
