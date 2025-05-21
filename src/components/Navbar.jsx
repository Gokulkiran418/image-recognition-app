import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition">
          Image Recognition
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition ${isActive ? 'underline' : ''}`
            }
          >
            Home
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;