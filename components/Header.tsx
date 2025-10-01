import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // Simulate user authentication state
  const user = { name: "John Doe" };
  return (
    <header className="w-full bg-gradient-to-r from-gray-600 via-gray-400 to-gray-200 text-white py-4 shadow sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 mr-2 relative">
            <Image src="/file.svg" alt="Jconnect Logo" fill className="object-contain" />
          </div>
          <Link href="/" className="font-bold text-2xl tracking-wide">
            Jconnect Zambia
          </Link>
        </div>
        <div className="flex gap-4 items-center text-base font-medium">
          <Link href="/apartments" className="hover:underline">
            Apartments
          </Link>
          <Link href="/boarding-houses" className="hover:underline">
            Boarding Houses
          </Link>
          <Link href="/guest-houses" className="hover:underline">
            Guest Houses
          </Link>
          <Link href="/hotels" className="hover:underline">
            Hotels
          </Link>
          <Link href="/lodges" className="hover:underline">
            Lodges
          </Link>
          <Link href="/rental-houses" className="hover:underline">
            Rental Houses
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:underline font-semibold">
            {user.name}
          </Link>
        </div>
      </nav>
    </header>
  );
}
