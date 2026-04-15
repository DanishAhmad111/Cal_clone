import { redirect } from 'next/navigation';

export default function Home() {
  // Directly point the user to the admin dashboard base routing for demo purposes
  redirect('/dashboard/event-types');
}
