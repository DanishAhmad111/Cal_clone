export interface EventType {
  id: string;
  title: string;
  description?: string | null;
  slug: string;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
