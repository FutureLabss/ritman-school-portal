"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import { useAuth } from "@/context/AuthContext";

export default function StudentApplication() {
  const router = useRouter();
  const authContext = useAuth();
  const user = authContext?.user;
  const loading = authContext?.loading;
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      const storedUser = localStorage.getItem("user");
      if (!user && !storedUser) {
        router.push("/auth/login");
      } else {
        setIsUserLoaded(true);
      }
    }
  }, [loading, user, router]);

  if (loading || !isUserLoaded) return <p>Loading...</p>;
  if (!user) return null; // Prevent rendering the form if the user is not available

  return <MultiStepForm />;
}
