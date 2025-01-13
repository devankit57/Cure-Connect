'use client'

import { useState, useEffect } from 'react'
import { AppointmentForm } from '../components/AppointmentForm'

interface Settings {
  startTime: string
  endTime: string
}

interface HomeContentProps {
  settings: Settings
}

export default function HomeContent({ settings }: HomeContentProps) {
  const [bookingInfo, setBookingInfo] = useState<{ id: string; bookingNumber: number } | null>(null)
  const [isBookingAllowed, setIsBookingAllowed] = useState(false)

  useEffect(() => {
    const checkBookingTime = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      const [startHour, startMinute] = settings.startTime.split(':').map(Number)
      const [endHour, endMinute] = settings.endTime.split(':').map(Number)
      
      const startTimeMinutes = startHour * 60 + startMinute
      const endTimeMinutes = endHour * 60 + endMinute

      setIsBookingAllowed(currentTime >= startTimeMinutes && currentTime <= endTimeMinutes)
    }

    checkBookingTime()
    const intervalId = setInterval(checkBookingTime, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [settings])

  const handleBookingSuccess = (id: string, bookingNumber: number) => {
    setBookingInfo({ id, bookingNumber })
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 sm:p-10">
        {isBookingAllowed ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Schedule Your Visit</h2>
            <AppointmentForm onBookingSuccess={handleBookingSuccess} />
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Booking Unavailable</h2>
            <p className="text-gray-600">
              Appointments can only be booked between {settings.startTime} and {settings.endTime}.
            </p>
          </div>
        )}
      </div>
      {bookingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Booking Successful!</h2>
            <p className="text-gray-600 mb-2">Your appointment ID is: <span className="font-bold text-indigo-600">{bookingInfo.id}</span></p>
            <p className="text-gray-600 mb-6">Your booking number is: <span className="font-bold text-indigo-600">{bookingInfo.bookingNumber}</span></p>
            <button
              onClick={() => setBookingInfo(null)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

