'use client'

import { useState } from 'react';
import { useEventTypes } from '@/hooks/useEventTypes';
import { useRouter } from 'next/navigation';

export default function NewEventTypePage() {
  const { createEventType } = useEventTypes();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [duration, setDuration] = useState('30');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createEventType({ title, slug, duration: Number(duration), description });
      router.push('/dashboard/event-types');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">New Event Type</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white border rounded-lg p-6 shadow-sm">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input required type="text" value={title} onChange={e => {
            setTitle(e.target.value);
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
          }} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
          <div className="flex border rounded-md overflow-hidden">
            <span className="bg-gray-50 px-3 py-2 text-sm text-gray-500 border-r select-none">cal.com/user/</span>
            <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="flex-1 px-3 py-2 text-sm outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
          <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>

        <div className="pt-4 border-t flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
            {loading ? 'Saving...' : 'Save and Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
