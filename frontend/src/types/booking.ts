import { EventType } from './eventType';

export interface Booking {
  id: string;
  bookerName: string;
  bookerEmail: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  eventTypeId: string;
  eventType: EventType;
}
