"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  };
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/admin/dashboard" 
              className={`block p-2 rounded-md ${isActive('/admin/dashboard') ? 'bg-primary' : 'hover:bg-gray-700'}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/bookings" 
              className={`block p-2 rounded-md ${isActive('/admin/bookings') ? 'bg-primary' : 'hover:bg-gray-700'}`}
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/contacts" 
              className={`block p-2 rounded-md ${isActive('/admin/contacts') ? 'bg-primary' : 'hover:bg-gray-700'}`}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 