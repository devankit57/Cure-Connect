import { Suspense } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import HomeContent from './HomeContent'
import LoadingSpinner from '../components/LoadingSpinner'

async function getSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/settings`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch settings')
  }
  return res.json()
}

export default async function Home() {
  const settings = await getSettings()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8">
            Book Your Clinic Appointment
          </h1>
          <Suspense fallback={<LoadingSpinner />}>
            <HomeContent settings={settings} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}

