'use client';

import { useState } from "react";
import MapboxMap from "./MapboxMap";
import Link from "next/link";
import Image from "next/image";

export interface Review {
  rating: number;
  comment: string;
}

export interface Property {
  id: string | number;
  title: string;
  type: string;
  location: string;
  description: string;
  price?: number;
  images?: string[];
  reviews?: Review[];
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [reviews, setReviews] = useState<Review[]>(property.reviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      setReviews([...reviews, { rating, comment }]);
      setRating(0);
      setComment("");
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="card mb-8 min-h-[520px] flex flex-col justify-between shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center w-full">

        {/* Images Carousel */}
        <div className="w-full h-48 relative rounded-lg mb-4 overflow-x-auto flex gap-2">
          {(property.images && property.images.length > 0 ? property.images : ["/window.svg"]).map((img, idx) => (
            <div key={idx} className="relative w-64 h-48 flex-shrink-0">
              <Image src={img} alt={property.title} fill className="object-cover rounded-lg" />
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center text-blue-900 dark:text-blue-300 truncate">
          {property.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mb-1 text-center">
          Location: {property.location}
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-1 text-center">
          Type: {property.type}
        </p>
        <p className="text-blue-700 dark:text-blue-300 font-bold text-center">
          ZMW {property.price ? property.price.toLocaleString() : "N/A"}
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-400 line-clamp-2 text-center">
          {property.description}
        </p>

        {/* Mapbox Map */}
        <div className="w-full my-4">
          <MapboxMap longitude={28.3228} latitude={-15.3875} />
        </div>

        {/* Reviews & Ratings */}
        <div className="w-full mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Rating:</span>
            {avgRating ? (
              <span className="text-yellow-500 font-bold">{avgRating} / 5</span>
            ) : (
              <span className="text-gray-400">No ratings yet</span>
            )}
          </div>
          <form className="flex flex-col gap-2 mb-2" onSubmit={handleReviewSubmit}>
            <label className="text-sm font-medium">Leave a review:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your review..."
              className="border rounded px-2 py-1"
              rows={2}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          {reviews.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold">Recent Reviews:</span>
              <ul className="mt-1 space-y-1">
                {reviews.slice(-3).reverse().map((r, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 border-b pb-1">
                    <span className="text-yellow-500">{r.rating}★</span> {r.comment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-semibold">
            Book Now
          </button>
          <Link
            href="/"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Return Home
          </Link>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
            Contact Owner
          </button>
          <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
            Save
          </button>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
