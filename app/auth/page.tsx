"use client"

import { useState } from "react"
import { signUp, signIn, signOut } from "@/utils/auth"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"signup" | "signin">("signin")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (mode === "signup") {
        await signUp(email, password)
        alert("Signup successful! Check your email for confirmation.")
      } else {
        await signIn(email, password)
        alert("Login successful!")
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="mt-4">
        Switch to {mode === "signup" ? "Sign In" : "Sign Up"}
      </button>

      <button onClick={signOut} className="mt-4 text-red-600">Sign Out</button>
    </div>
  )
}
