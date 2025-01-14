import { Suspense } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import clientPromise from '../../lib/mongodb';
import LoadingSpinner from '../../components/LoadingSpinner';

export const dynamic = 'force-dynamic';

interface Appointment {
  id: string;
  name: string;
  mobile: string;
  address: string;
  date: string;
  time: string;
  bookingNumber: number;
  createdAt: Date;
}

async function getAppointments() {
  try {
    const client = await clientPromise;
    const db = client.db('appointmentsDB');

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const rawAppointments = await db
      .collection('appointments')
      .find({ date: formattedDate })
      .sort({ createdAt: 1 })
      .toArray();

    // Map raw MongoDB documents to the Appointment type
    const appointments: Appointment[] = rawAppointments.map((doc) => ({
      id: doc._id.toString(), // Convert ObjectId to string
      name: doc.name || '',
      mobile: doc.mobile || '',
      address: doc.address || '',
      date: doc.date || '',
      time: doc.time || '',
      bookingNumber: doc.bookingNumber || 0,
      createdAt: doc.createdAt || new Date(),
    }));

    return { appointments, error: null };
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return {
      appointments: [],
      error: 'Failed to load appointments. Please try again later.',
    };
  }
}

function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No appointments scheduled for today.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">{appointment.bookingNumber}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{appointment.name}</p>
                <p className="text-xs text-gray-500">{appointment.address}</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                {appointment.time}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function AppointmentsPage() {
  const { appointments, error } = await getAppointments();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8">
          Today&apos;s Appointments
          </h1>
          {error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                  Appointments
                </h2>
                <Suspense fallback={<LoadingSpinner />}>
                  <AppointmentList appointments={appointments} />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
