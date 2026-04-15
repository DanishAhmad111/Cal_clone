import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import { EventType } from '../types/eventType';

export function useEventTypes() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventTypes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/event-types');
      setEventTypes(data as unknown as EventType[]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch event types');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEventType = async (payload: Partial<EventType>) => {
    const data = await apiClient.post('/event-types', payload);
    await fetchEventTypes();
    return data;
  };

  const updateEventType = async (id: string, payload: Partial<EventType>) => {
    const data = await apiClient.put(`/event-types/${id}`, payload);
    await fetchEventTypes();
    return data;
  };

  const deleteEventType = async (id: string) => {
    await apiClient.delete(`/event-types/${id}`);
    await fetchEventTypes();
  };

  useEffect(() => {
    fetchEventTypes();
  }, [fetchEventTypes]);

  return { eventTypes, loading, error, fetchEventTypes, createEventType, updateEventType, deleteEventType };
}
