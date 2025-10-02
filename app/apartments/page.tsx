"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PropertyCard, { Property } from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { supabase } from "@/utils/supabase/client";

export default function ApartmentsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("type", "Apartment");

      if (error) console.error(error);
      else {
        setProperties(data || []);
        setFiltered(data || []);
      }

      setLoading(false);
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col p-6">
      <Head>
        <title>Apartments - Jconnect Zambia</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-center text-pink-700">Apartments</h1>

      <SearchFilters properties={properties} onFiltered={setFiltered} />

      {loading ? (
        <p className="text-center py-20">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {filtered
              .slice((page - 1) * pageSize, page * pageSize)
              .map((property) => (
                <Link href={`/apartments/${property.id}`} key={property.id}>
                  <PropertyCard property={property} />
                </Link>
              ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(filtered.length / pageSize) }).map((_, i) => (
              <button
                key={i}
                className={`btn px-3 ${page === i + 1 ? "bg-pink-600 text-white" : "bg-gray-200"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
