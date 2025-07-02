
export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          BWM Task Manager
        </div>

        <div className="space-x-4">
          {/* If using React Router */}
          {/* <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</Link> */}

          {/* Or just use basic <a> tags */}
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Tasks
          </a>
        </div>
      </div>
    </nav>
  );
}
