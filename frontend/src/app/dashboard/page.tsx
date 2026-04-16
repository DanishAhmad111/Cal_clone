'use client'

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back! Manage your events and bookings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/event-types" className="bg-white border rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-colors">
          <h2 className="font-semibold text-gray-900 mb-1">Event Types</h2>
          <p className="text-sm text-gray-500">Create and manage your event types.</p>
        </Link>
        <Link href="/dashboard/bookings" className="bg-white border rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-colors">
          <h2 className="font-semibold text-gray-900 mb-1">Bookings</h2>
          <p className="text-sm text-gray-500">View upcoming and past bookings.</p>
        </Link>
        <Link href="/dashboard/availability" className="bg-white border rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-colors">
          <h2 className="font-semibold text-gray-900 mb-1">Availability</h2>
          <p className="text-sm text-gray-500">Set your weekly availability hours.</p>
        </Link>
      </div>
    </div>
  );
}
