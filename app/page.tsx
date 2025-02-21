"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const user = useAuth()?.user;
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20]">
      <div className="mt-40 flex gap-2 pb-10">
        <Link href="/auth/login" className="hover:text-secondary">
          <p>Login</p>
        </Link>
        {user ? (
          <Link href="/student/dashboard" className="hover:text-secondary">
            <p>Dasboard</p>
          </Link>
        ) : (
          <Link href="/auth/register/chemistry" className="hover:text-secondary">
            <p>Register</p>
          </Link>
        )}
      </div>
      Ritman School Portal
    </div>
  );
}
