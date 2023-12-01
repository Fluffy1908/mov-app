export default function Navbar() {
  return (
    <div>
      <nav className="bg-red-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold">
            <a href="/" className="hover:text-gray-300">
              MovieR
            </a>
          </div>
          <div className="space-x-4">
            <a href="/popular" className="hover:text-gray-300">
              Popular Now
            </a>
            <a href="/rated" className="hover:text-gray-300">
              Top Rated
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
