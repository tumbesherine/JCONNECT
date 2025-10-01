"use client";
// global styles imported in layout.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import PropertyCard, { Property } from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import Link from "next/link";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is always an array
        const arr = Array.isArray(data) ? data : [];
        setProperties(arr);
        setFiltered(arr);
        setLoading(false);
      });
    // Register service worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Jconnect Property Listings - Zambia</title>
        <meta
          name="description"
          content="Find, view, and get directions to properties across Zambia. Search apartments, lodges, hotels, guest houses, and more."
        />
        <meta property="og:title" content="Jconnect Property Listings" />
        <meta
          property="og:description"
          content="Find, view, and get directions to properties across Zambia."
        />
      </Head>
      {/* Sticky header for navigation */}
      <header
        className={`sticky top-0 z-20 w-full shadow-md ${darkMode ? "bg-gray-950" : "bg-white"}`}
      >
        <nav className="flex flex-wrap items-center justify-between px-4 py-3 md:px-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-blue-700">Jconnect</span>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>
      <main
        className={`min-h-screen w-full flex flex-col items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="w-full max-w-4xl mx-auto mt-10 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-900 flex-1">
              Jconnect Property Listings
            </h1>
            <button
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <p className="mb-8 text-lg sm:text-xl text-center text-gray-700">
            Find, view, and get directions to properties across Zambia.
          </p>
          <div className="mb-6">
            <SearchFilters properties={properties} onFiltered={setFiltered} />
          </div>
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {filtered
                  .slice((page - 1) * pageSize, page * pageSize)
                  .map((property) => (
                    <Link href={`/property/${property.id}`} key={property.id}>
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
                      className={`btn px-3 ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
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
      </main>
    </>
  );
}
