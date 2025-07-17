import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            NOC Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Plugins Fiber Network Operations Center
          </p>
        </div>
        
        <div className="card p-6">
          <Outlet />
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Plugins Fiber. All rights reserved.
        </div>
      </div>
    </div>
  )
}
