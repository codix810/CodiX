'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlusCircle, FaEye, FaEnvelopeOpenText, FaSignOutAlt } from 'react-icons/fa';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    } else {
      setUsername(storedUsername || 'Selwen Mahmoud');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 md:px-6">
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-700 text-xl tracking-wide">
            <a href="/dashboard">{username}</a>
          </span>

          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* ✅ القائمة */}
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row md:items-center md:justify-between md:gap-6 mt-4 md:mt-0 w-full transition-all`}
        >
          <a
            href="/dashboard/AddMedia"
            className="flex items-center gap-2 justify-center text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>AddMedia</span>
          </a>

          <a
            href="/dashboard/ViewMedia"
            className="flex items-center gap-2 justify-center text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaEye />
            <span>ViewMedia</span>
          </a>

          <a
            href="/dashboard/contact-messages"
            className="flex items-center gap-2 justify-center text-green-600 hover:bg-green-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaEnvelopeOpenText />
            <span>View Messages</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 justify-center text-red-500 hover:bg-red-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* ✅ محتوى الصفحة */}
      <div className="p-6">{children}</div>
    </div>
  );
}
