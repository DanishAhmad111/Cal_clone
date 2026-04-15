'use client'

import { useSlots } from '@/hooks/useSlots';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { EventType } from '@/types/eventType';

export default function PublicBookingPage({ params }: { params: { slug: string } }) {
  const { slots, fetchSlots, loading } = useSlots();
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    apiClient.get(`/event-types/${params.slug}/public`).then((res: any) => setEventData(res)).catch(() => {});
  }, [params.slug]);

  if (!eventData) return <div className="p-8 text-center">Loading booking page...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg border flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        
        {/* Left Side: Info */}
        <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r bg-gray-50/50">
          <div className="text-sm font-medium text-gray-500 mb-2">John Doe</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{eventData.title}</h1>
          <div className="flex items-center text-gray-600 mb-2 gap-2 text-sm">
            <span>⏱️</span> {eventData.duration} min
          </div>
          <p className="text-gray-600 text-sm mt-4">{eventData.description}</p>
        </div>

        {/* Right Side: Slots logic */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-lg font-semibold mb-4">Select a Date & Time</h2>
          
          <div className="mb-6">
            <input 
              type="date" 
              className="border p-2 rounded-md" 
              value={date} 
              onChange={e => {
                setDate(e.target.value);
                fetchSlots(params.slug, e.target.value);
              }} 
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {loading ? (
              <span className="text-gray-500 text-sm">Finding slots...</span>
            ) : slots.length > 0 ? (
              slots.map(slot => (
                <button 
                  key={slot.startTime} 
                  className="p-3 border border-blue-200 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
                  onClick={() => alert(`Slot mapped out functionally: ${new Date(slot.startTime).toLocaleTimeString()}`)}
                >
                  {new Date(slot.startTime).toLocaleTimeString([], {timeStyle: 'short'})}
                </button>
              ))
            ) : date && !loading ? (
              <span className="text-gray-500 text-sm">No slots available for this day.</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
