"use client";
import { useState } from "react";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  async function handleLogin(email: string, password: string) {
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, type: "login" }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else window.location.href = "/dashboard";
  }
  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="flex flex-wrap gap-4 justify-start items-center mb-6">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/register" className="btn">
            Register
          </Link>
          <button className="btn ml-2" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <AuthForm type="login" onSubmit={handleLogin} />
        {error && <div className="text-red-600 mt-4">{error}</div>}
      </div>
    </div>
  );
}
