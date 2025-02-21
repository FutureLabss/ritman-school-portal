"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FormSuccess() {
  const router = useRouter();

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          {/* University Logo */}
          <Image src="/logo.png" alt="University Logo" width={48} height={48} />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          Form submitted successfully
        </h2>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Confirmation Text */}
        <p className="text-gray-600 mb-6">
          Your form has been submitted successfully
        </p>

        {/* Buttons */}
        <button
          className="w-full bg-indigo-900 text-white py-2 rounded-md mb-2 hover:bg-indigo-800 transition"
          onClick={() => router.push("/payment")}
        >
          Pay Application Fee
        </button>

        <button
          className="w-full border border-indigo-900 text-indigo-900 py-2 rounded-md hover:bg-indigo-50 transition"
          onClick={() => router.push("/dashboard")}
        >
          Proceed to Dashboard
        </button>

        {/* Application Fee Info */}
        <div className="mt-6 text-sm text-gray-500 text-left flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
            />
          </svg>
          <p>
            <span className="font-semibold">Application Fee</span>
            <br />
            Thank you for registering for your program. Applicants are advised
            to pay their admission fee for the form to be processed. Thank you!
          </p>
        </div>
      </div>
    </section>
  );
}
