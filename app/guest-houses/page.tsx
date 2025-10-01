"use client";
import PropertyCard, { Property } from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function GuestHousesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    fetch("/api/properties?type=Guest House")
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setProperties(arr);
        setFiltered(arr);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Guest Houses - Jconnect Zambia</title>
        <meta
          name="description"
          content="Browse guest houses in Zambia. Search, filter, and book your next stay."
        />
      </Head>
      <div
        className={`min-h-screen w-full flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="flex flex-wrap gap-4 justify-start items-center mb-6">
          <Link href="/dashboard" className="btn">
            Dashboard
          </Link>
          <Link href="/login" className="btn">
            Login
          </Link>
          <Link href="/register" className="btn">
            Register
          </Link>
          <button className="btn ml-2" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <SearchFilters properties={properties} onFiltered={setFiltered} />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-700 text-center">
          Guest Houses
        </h1>
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {filtered
                .slice((page - 1) * pageSize, page * pageSize)
                .map((property) => (
                  <Link href={`/guest-houses/${property.id}`} key={property.id}>
                    <PropertyCard property={property} />
                  </Link>
                ))}
            </div>
            <div className="flex justify-center gap-2 mb-8">
              {Array.from(
                { length: Math.ceil(filtered.length / pageSize) },
                (_, i) => (
                  <button
                    key={i}
                    className={`btn px-3 ${page === i + 1 ? "bg-pink-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
