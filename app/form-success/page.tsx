"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedImage from "@/components/AnimatedImage";
import api from "@/utils/api";

export default function FormSuccess() {
  const router = useRouter();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the Paystack payment link when the component mounts
  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user?.token) {
          api.defaults.headers.Authorization = `Bearer ${user.token}`;
          const response = await api.post("/pay", {
            fee_id: 1,
          });
          console.log(response.data.authorization_url);
          if (response.status === 200) {
            setPaymentLink(response.data.authorization_url);
          } else {
            setError("Failed to generate payment link");
          }
        } else {
          setError("No user token found");
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching the payment link");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentLink();
  }, []);

  // Handle payment button click
  const handlePayment = () => {
    if (paymentLink) {
      window.location.href = paymentLink; // Redirect to Paystack
    } else {
      alert("Payment link is not available. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-white min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-lg mx-auto">
        <div className="flex justify-start mb-10">
          {/* <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} /> */}
        </div>

        {/* Success Message */}
        <h2 className="text-[2rem] text-center font-bold text-primary mb-4">
          Form submitted successfully
        </h2>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <AnimatedImage />
        </div>

        {/* Confirmation Text */}
        <p className="mb-6 text-[0.9rem] text-center">
          Your form has been submitted successfully
        </p>

        {/* Buttons */}
        <button
          className="w-full bg-primary text-white py-2 rounded-md mb-2 hover:bg-indigo-800 transition"
          onClick={handlePayment}
          disabled={loading || !paymentLink}
        >
          {loading ? "Loading..." : "Pay Application Fee"}
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

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </section>
  );
}
