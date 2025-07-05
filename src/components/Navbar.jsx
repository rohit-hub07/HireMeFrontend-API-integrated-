import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Default to light mode (false)
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-semibold text-gray-800 dark:text-white"
      >
        HireMe
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          to="/saved"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
        >
          Saved Jobs
        </Link>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? (
            // Moon icon for dark mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
              />
            </svg>
          )}
        </button>
        <img
          src="https://static.vecteezy.com/system/resources/previews/066/533/077/large_2x/funny-tired-chubby-black-cat-close-up-sleepy-look-perfect-for-sticker-avatar-and-more-isolated-background-cartoon-illustration-free-vector.jpg"
          alt="avatar"
          className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
      </div>
    </header>
  );
};

export default Navbar;
