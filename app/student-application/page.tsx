"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import { useAuth } from "@/context/AuthContext";

export default function StudentApplication() {
  const router = useRouter();
  const authContext = useAuth();
  const user = authContext?.user;
  const loading = authContext?.loading;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  });

  if (loading) return <p>Loading...</p>;
  return <MultiStepForm />;
}
