export default function AdminPanel() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          System configuration and user management
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Role-based access controls, system settings, and administrative tools.
        </p>
      </div>
    </div>
  )
}
