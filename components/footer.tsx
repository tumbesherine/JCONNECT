const Footer: React.FC = () => (
  <footer className="w-full py-8 mt-12 bg-gray-300 text-gray-700">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
      <div className="flex-1 text-center md:text-left">
        <div className="font-bold text-lg mb-2">Jconnect Property Listings</div>
        <div className="mb-2">
          House No 121/30, Mtendere East, Lusaka, Zambia
        </div>
        <div className="mb-2">
          Email:{" "}
          <a href="mailto:josephfulawa@gmail.com" className="underline">
            josephfulawa@gmail.com
          </a>
        </div>
        <div>
          Phone:{" "}
          <a href="tel:+260770387003" className="underline">
            +260776360394
          </a>
        </div>
      </div>
      <nav className="flex-1 flex flex-wrap justify-center gap-2 md:gap-4">
        <a href="/boarding-houses" className="underline">
          Boarding Houses
        </a>
        <a href="/rental-houses" className="underline">
          Rental Houses
        </a>
        <a href="/apartments" className="underline">
          Apartments
        </a>
        <a href="/hotels" className="underline">
          Hotels
        </a>
        <a href="/lodges" className="underline">
          Lodges
        </a>
        <a href="/login" className="underline">
          Login
        </a>
        <a href="/register" className="underline">
          Register
        </a>
      </nav>
      <div className="flex-1 flex flex-col items-center md:items-end">
        <div className="mb-2 font-semibold">Follow us:</div>
        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              className="text-blue-700 hover:text-blue-900"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              className="text-blue-500 hover:text-blue-700"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.834 4.066 6.87 1.64 3.94c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              className="text-pink-600 hover:text-pink-800"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.282.342 2.394 1.322 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.374.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.282-.342-2.394-1.322-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-xs mt-6">
      © 2025 Jconnect Property Listings. All rights reserved.
    </div>
  </footer>
);

export default Footer;
