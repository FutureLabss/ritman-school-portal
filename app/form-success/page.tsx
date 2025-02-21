"use client";

import { useRouter } from "next/navigation";
import AnimatedImage from "@/components/AnimatedImage";

export default function FormSuccess() {
  const router = useRouter();

  return (
    <section className="bg-gray-white min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col  max-w-lg mx-auto">
        <div className="flex justify-start mb-10">
          {/* <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} /> */}
        </div>
        {/* Success Message */}
        <h2 className="text-[2rem] text-center font-bold text-primary mb-4">
          Form submitted successfully
        </h2>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          {/* <Image src="/copy.png" alt="Success Icon" width={100} height={100} /> */}
          <AnimatedImage />

          {/* <svg
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
          </svg> */}
        </div>

        {/* Confirmation Text */}
        <p className="mb-6 text-[0.9rem] text-center">
          Your form has been submitted successfully
        </p>

        {/* Buttons */}
        <button
          className="w-full bg-primary text-white py-2 rounded-md mb-2 hover:bg-indigo-800 transition"
          onClick={() => alert("Coming soon...")}
        >
          Pay Application Fee
        </button>

        <button
          className="w-full border border-indigo-900 text-indigo-900 py-2 rounded-md hover:bg-indigo-50 transition"
          onClick={() => router.push("/student/dashboard")}
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
