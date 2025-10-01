import { useState } from "react";
import type { Property } from "./PropertyCard";

interface SearchFiltersProps {
  properties: Property[];
  onFiltered: (filtered: Property[]) => void;
}

const propertyTypes = [
  "All",
  "Boarding House",
  "Guest House",
  "Hotel",
  "Lodge",
  "Rental House",
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  properties,
  onFiltered,
}) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = properties.filter((p) => {
      const matchesLocation = location
        ? p.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type === "All" ? true : p.type === type;
      const matchesMin = minPrice
        ? p.price && p.price >= Number(minPrice)
        : true;
      const matchesMax = maxPrice
        ? p.price && p.price <= Number(maxPrice)
        : true;
      return matchesLocation && matchesType && matchesMin && matchesMax;
    });
    onFiltered(filtered);
  };

  const handleClear = () => {
    setLocation("");
    setType("All");
    setMinPrice("");
    setMaxPrice("");
    onFiltered(properties);
  };

  return (
    <form
      className="flex flex-wrap gap-4 items-center justify-center mb-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
      onSubmit={handleSubmit}
      aria-label="Search Filters"
    >
      <input
        type="text"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-40"
      />
      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-40"
      >
        {propertyTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="minPrice"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-32"
      />
      <input
        type="number"
        name="maxPrice"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-32"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition font-semibold"
      >
        Search
      </button>
      <button
        type="button"
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition font-semibold"
        onClick={handleClear}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchFilters;
