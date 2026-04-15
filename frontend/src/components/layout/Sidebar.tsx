import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col pt-8">
      <div className="px-6 pb-6 border-b font-bold text-xl text-gray-800">
        Cal Clone
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/dashboard/event-types" className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">Event Types</Link>
        <Link href="/dashboard/bookings" className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">Bookings</Link>
        <Link href="/dashboard/availability" className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">Availability</Link>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">JD</div>
          <span className="text-sm font-semibold">John Doe</span>
        </div>
      </div>
    </aside>
  );
}
