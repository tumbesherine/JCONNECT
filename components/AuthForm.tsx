"use client";

import { useState } from "react";

interface AuthFormProps {
  type?: "login" | "register";
  onSubmit: (email: string, password: string, role?: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type = "login", onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("property owner");

  return (
    <form
      className="card max-w-md mx-auto mt-12 p-6 border rounded shadow"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password, role);
      }}
    >
      <h2 className="text-2xl font-bold mb-6">{type === "login" ? "Login" : "Register"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring"
        onChange={(e) => setPassword(e.target.value)}
      />

      {type === "register" && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded"
        >
          <option value="property owner">Property Owner</option>
          <option value="tenant">Tenant</option>
        </select>
      )}

      <button type="submit" className="btn w-full">
        {type === "login" ? "Login" : "Create Account"}
      </button>
    </form>
  );
};

export default AuthForm;
