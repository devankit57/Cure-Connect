export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Cure Connect. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

