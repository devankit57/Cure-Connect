import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors mb-4 sm:mb-0">
            CURE-CONNECT
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-sm font-medium hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link href="/appointments" className="text-sm font-medium hover:text-blue-200 transition-colors">
            Today&apos;s Appointments
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

