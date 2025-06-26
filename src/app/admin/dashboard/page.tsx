"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalContacts: number;
  unreadContacts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Gagal memuat data');
        }
        
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Gagal memuat data dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-3xl font-bold text-primary mt-2">{stats?.totalBookings || 0}</p>
          <Link 
            href="/admin/bookings" 
            className="text-sm text-primary hover:underline mt-4 inline-block"
          >
            View All
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pending Bookings</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{stats?.pendingBookings || 0}</p>
          <Link 
            href="/admin/bookings?status=pending" 
            className="text-sm text-primary hover:underline mt-4 inline-block"
          >
            View All
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Contacts</h3>
          <p className="text-3xl font-bold text-primary mt-2">{stats?.totalContacts || 0}</p>
          <Link 
            href="/admin/contacts" 
            className="text-sm text-primary hover:underline mt-4 inline-block"
          >
            View All
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Unread Messages</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">{stats?.unreadContacts || 0}</p>
          <Link 
            href="/admin/contacts?status=unread" 
            className="text-sm text-primary hover:underline mt-4 inline-block"
          >
            View All
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Status</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(stats?.pendingBookings || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">Pending ({stats?.pendingBookings || 0})</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(stats?.confirmedBookings || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">Confirmed ({stats?.confirmedBookings || 0})</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(stats?.completedBookings || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">Completed ({stats?.completedBookings || 0})</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(stats?.cancelledBookings || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">Cancelled ({stats?.cancelledBookings || 0})</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/admin/bookings/new" 
              className="bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-md text-center transition-colors"
            >
              New Booking
            </Link>
            <Link 
              href="/admin/bookings?status=pending" 
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md text-center transition-colors"
            >
              Pending Orders
            </Link>
            <Link 
              href="/admin/contacts?status=unread" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center transition-colors"
            >
              Unread Messages
            </Link>
            <Link 
              href="/admin/settings" 
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md text-center transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 