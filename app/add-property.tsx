"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "Apartment",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Failed to add property");
      }
    } catch (err: any) {
      console.error("Add property error:", err);
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Apartment">Apartment</option>
          <option value="Boarding House">Boarding House</option>
          <option value="Guest House">Guest House</option>
          <option value="Hotel">Hotel</option>
          <option value="Lodge">Lodge</option>
          <option value="Rental House">Rental House</option>
        </select>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}
