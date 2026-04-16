'use client'

import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Guest';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Thank you, <span className="font-semibold">{name}</span>. Your meeting has been scheduled.
        </p>
        {date && time && (
          <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700">
            <p><span className="font-medium">Date:</span> {date}</p>
            <p><span className="font-medium">Time:</span> {time}</p>
          </div>
        )}
        <p className="text-xs text-gray-400 mt-6">A confirmation email will be sent shortly.</p>
      </div>
    </div>
  );
}
