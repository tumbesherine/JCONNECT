import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    setUser({ name: "Joseph f", email: "john@example.com" });
  }, []);

  if (!user) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto py-10 px-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Profile
      </h1>
      <div className="mb-4">
        <span className="font-semibold">Name:</span> {user.name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <Link href="/" className="btn bg-blue-600 text-white">
        Return Home
      </Link>
      <button className="btn bg-red-600 text-white ml-4">Logout</button>
    </div>
  );
}
