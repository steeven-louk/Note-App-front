import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
// import { useAuth } from '../context/ContextProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const {user} = useAuth()
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };
console.log(user)
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">NoteApp</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="search"
                placeholder="Search..."
                className="w-64 p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2 p-2 bg-gray-200 rounded">
                🔍
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-600 capitalize font-bold hover:text-primary px-3 py-2 rounded-md text-sm">
                {user}
              </Link>
              {/* <Link to="/login" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link> */}
              <Link to="/logout" className="text-white hover:text-primary hover:text-gray-300 bg-red-500 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-200 rounded">
              ☰
              <span className="sr-only">Open menu</span>
            </button>
            {isOpen && (
              <div className="absolute right-0 top-16 w-[300px] sm:w-[400px] bg-white shadow-lg p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4">
                    <span className="text-2xl font-bold text-primary">Logo</span>
                    <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-200 rounded">
                      ✖
                      <span className="sr-only">Close menu</span>
                    </button>
                  </div>
                  <nav className="flex flex-col space-y-4 p-4">
                    <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Link to="/register" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                      Register
                    </Link>
                  </nav>
                  <div className="mt-auto p-4">
                    <form onSubmit={handleSearch} className="flex items-center">
                      <input
                        type="search"
                        placeholder="Search..."
                        className="flex-grow p-2 border rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="ml-2 p-2 bg-gray-200 rounded">
                        🔍
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
