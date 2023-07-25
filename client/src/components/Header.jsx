import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { loginWithPopup, isAuthenticated, logout } = useAuth0();

  return (
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex">
              <img
                className="w-auto h-8 lg:h-10"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <NavLink
              to="/"
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
            >
              Home
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => loginWithPopup({ connection: "email" })}
                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
