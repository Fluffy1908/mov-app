
export default function Navbar() {
  return (
    <div>
    <nav className="bg-red-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-300">Brand</a>
        </div>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">Popular Now</a>
          <a href="/" className="hover:text-gray-300">Rating</a>
          <a href="/" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
    </div>
  )
}