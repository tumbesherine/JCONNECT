"use client";
import { useEffect, useState } from "react";
import PropertyCard, { Property } from "@/components/PropertyCard";
import MapPlaceholder from "@/components/MapPlaceholder";

export default function PropertyDetailsPage({ params }: any) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/properties?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      });
  }, [params.id]);
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!property)
    return (
      <div className="text-center py-20 text-red-600">Property not found.</div>
    );
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-black">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-900 text-center">
        {property.title}
      </h1>
      <PropertyCard property={property} />
      <MapPlaceholder />
      <BookingForm propertyId={property.id} />
    </div>
  );
}

function BookingForm({ propertyId: _propertyId }: { propertyId: string | number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Send booking/inquiry to backend
    console.log("Booking for property:", _propertyId, { name, email, message });
    setSuccess("Booking request sent!");
  }
  return (
    <form className="card max-w-lg mx-auto mt-8 p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Book or Inquire</h2>
      <input
        className="border px-3 py-2 rounded mb-2 w-full"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border px-3 py-2 rounded mb-2 w-full"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="border px-3 py-2 rounded mb-2 w-full"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button className="btn w-full" type="submit">
        Send Request
      </button>
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </form>
  );
}
