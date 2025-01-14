import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, mobile, address } = await request.json();
    const client = await clientPromise;
    const db = client.db("appointmentsDB");

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];

    // Calculate booking number for the current date
    const todayAppointments = await db.collection("appointments")
      .find({ date: formattedDate })
      .sort({ bookingNumber: -1 })
      .toArray();

    const bookingNumber = todayAppointments.length > 0 ? todayAppointments[0].bookingNumber + 1 : 1;

    const appointment = {
      id: Date.now().toString(),
      name,
      mobile,
      address,
      date: formattedDate,
      time: formattedTime,
      bookingNumber,
      status: "pending", // Default status
      createdAt: date,
    };

    const result = await db.collection("appointments").insertOne(appointment);

    if (!result.acknowledged) {
      throw new Error('Failed to insert appointment');
    }

    return NextResponse.json({
      message: "Appointment booked successfully",
      id: appointment.id,
      bookingNumber: appointment.bookingNumber,
    }, { status: 201 });
  } catch (e) {
    console.error('Error creating appointment:', e);
    return NextResponse.json({
      message: "Error booking appointment",
      error: e instanceof Error ? e.message : "Unknown error",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("appointmentsDB");

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Fetch all appointments for today
    const appointments = await db.collection("appointments")
      .find({ date: formattedDate })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json(appointments);
  } catch (e) {
    console.error('Error fetching appointments:', e);
    return NextResponse.json({
      message: "Error fetching appointments",
      error: e instanceof Error ? e.message : "Unknown error",
    }, { status: 500 });
  }
}
