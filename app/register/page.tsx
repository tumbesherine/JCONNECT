"use client";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  async function handleRegister(
    email: string,
    password: string,
    role: string = "landlord",
  ) {
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, type: "register", role }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else setSuccess("Registration successful! Please login.");
  }
  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Register
      </h1>
      <AuthForm type="register" onSubmit={handleRegister} />
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
}
