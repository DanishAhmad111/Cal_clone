'use client'

import { useBookings } from '@/hooks/useBookings';
import { useState } from 'react';

export default function BookingsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const { bookings, loading, error, cancelBooking } = useBookings(tab);

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500">See upcoming and past events booked through your links.</p>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setTab('upcoming')} className={`pb-3 font-medium text-sm border-b-2 ${tab === 'upcoming' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Upcoming</button>
        <button onClick={() => setTab('past')} className={`pb-3 font-medium text-sm border-b-2 ${tab === 'past' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Past</button>
      </div>

      {loading ? (
        <div className="p-8">Loading API bookings...</div>
      ) : error ? (
        <div className="p-8 text-red-500">Error: {error}</div>
      ) : (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden divide-y">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">No {tab} bookings found.</div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="p-5 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">{new Date(b.startTime).toLocaleDateString()}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(b.startTime).toLocaleTimeString([], {timeStyle: 'short'})} - {new Date(b.endTime).toLocaleTimeString([], {timeStyle: 'short'})}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium">{b.eventType.title}</span>
                     <span className="text-xs text-gray-500">{b.bookerName}</span>
                  </div>
                </div>
                {b.status === 'CANCELLED' ? (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium">Cancelled</span>
                ) : (
                  tab === 'upcoming' ? (
                     <button onClick={() => cancelBooking(b.id)} className="text-xs border px-3 py-1.5 rounded-md font-medium text-red-600 bg-white hover:bg-red-50">
                       Cancel
                     </button>
                  ) : <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">Completed</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
