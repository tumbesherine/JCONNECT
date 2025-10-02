"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

interface Profile {
  id: string;
  role: "property owner" | "tenant";
}

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price?: number;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error?.name === "AuthSessionMissingError" || !data?.user) {
          // No session, redirect to login
          router.push("/login");
          return;
        }

        const user = data.user;

        // Fetch profile row
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single<Profile>();

        if (profileError) {
          console.error("Error fetching profile:", JSON.stringify(profileError, null, 2));
          setLoading(false);
          return;
        }

        if (!profileData) {
          console.error("Profile not found for user:", user.id);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // If owner, fetch their properties
        if (profileData.role === "property owner") {
          const { data: props, error: propsError } = await supabase
            .from("properties")
            .select("*")
            .eq("owner_id", profileData.id);

          if (propsError) {
            console.error("Error fetching properties:", JSON.stringify(propsError, null, 2));
          } else {
            setProperties(props || []);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  if (!profile) return null; // user will be redirected automatically

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>
      <p className="mb-6 text-center text-lg">
        Welcome, <span className="font-semibold">{profile.role}</span>!
      </p>

      {profile.role === "property owner" ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Properties</h2>
          <Link href="/add-property" className="btn mb-4">
            Add New Property
          </Link>
          {properties.length === 0 ? (
            <p>You have no properties listed yet.</p>
          ) : (
            <ul className="space-y-4">
              {properties.map((prop) => (
                <li
                  key={prop.id}
                  className="border p-4 rounded bg-white dark:bg-gray-800"
                >
                  <h3 className="font-semibold text-xl">{prop.title}</h3>
                  <p>Type: {prop.type}</p>
                  <p>Location: {prop.location}</p>
                  <p>Price: ZMW {prop.price?.toLocaleString() || "N/A"}</p>
                  <Link
                    href={`/properties/${prop.id}`}
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
          <Link href="/properties" className="btn mb-4">
            Browse Properties
          </Link>
          <p>As a tenant, you can view and book properties here.</p>
        </>
      )}
    </div>
  );
}
