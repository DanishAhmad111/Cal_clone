'use client'

import { useEventTypes } from '@/hooks/useEventTypes';
import Link from 'next/link';

export default function EventTypesPage() {
  const { eventTypes, loading, error } = useEventTypes();

  if (loading) return <div className="p-8">Loading event formats from Backend...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Event Types</h1>
          <p className="text-sm text-gray-500">Create events to share for people to book on your calendar.</p>
        </div>
        <Link href="/dashboard/event-types/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
          + New Event Type
        </Link>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden divide-y">
        {eventTypes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No event types setup yet.</div>
        ) : (
          eventTypes.map(event => (
             <div key={event.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">/{event.slug} · {event.duration}m</p>
                  </div>
               </div>
               <div>
                  <button className="text-sm border px-3 py-1.5 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Copy Link
                  </button>
               </div>
             </div>
          ))
        )}
      </div>
    </div>
  )
}
