'use client'

import { useState, useEffect } from 'react';
import { useAvailability } from '@/hooks/useAvailability';
import { Availability } from '@/types/availability';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const { availability, loading, error, saveAvailability } = useAvailability();
  const [localState, setLocalState] = useState<Availability[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (availability && availability.length > 0) {
      setLocalState(JSON.parse(JSON.stringify(availability)));
    }
  }, [availability]);

  const handleToggleDay = (dayIndex: number) => {
    const newState = [...localState];
    newState[dayIndex].isAvailable = !newState[dayIndex].isAvailable;
    setLocalState(newState);
  };

  const handleTimeChange = (dayIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const newState = [...localState];
    newState[dayIndex][field] = value;
    setLocalState(newState);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMsg('');
    try {
      await saveAvailability(localState);
      setSuccessMsg('Availability saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Failed to save availability:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading schedule from Backend...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Availability</h1>
          <p className="text-sm text-gray-500">Configure times when you are available for bookings.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200 text-sm">
          {successMsg}
        </div>
      )}

      <div className="bg-white border rounded-lg shadow-sm divide-y">
        {localState.map((day, index) => (
          <div key={day.dayOfWeek} className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4 w-40">
              <input 
                type="checkbox" 
                checked={day.isAvailable} 
                onChange={() => handleToggleDay(index)} 
                className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer" 
              />
              <span className="font-medium text-gray-700">{DAYS[day.dayOfWeek]}</span>
            </div>
            {day.isAvailable ? (
               <div className="flex items-center gap-3">
                 <input 
                   type="time" 
                   value={day.startTime}
                   onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                   className="border px-3 py-1.5 rounded-md text-sm text-gray-700 focus:ring-black focus:border-black outline-none" 
                 />
                 <span className="text-gray-400">-</span>
                 <input 
                   type="time" 
                   value={day.endTime}
                   onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                   className="border px-3 py-1.5 rounded-md text-sm text-gray-700 focus:ring-black focus:border-black outline-none" 
                 />
               </div>
            ) : (
               <span className="text-gray-400 italic text-sm">Unavailable</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
