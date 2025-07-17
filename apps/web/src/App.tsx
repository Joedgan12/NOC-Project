import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { supabase } from '@/services/supabase'

// Layout Components
import Layout from '@/components/Layout/Layout'
import AuthLayout from '@/components/Layout/AuthLayout'

// Page Components
import Login from '@/pages/Auth/Login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import SystemStatus from '@/pages/SystemStatus/SystemStatus'
import AlertManagement from '@/pages/Alerts/AlertManagement'
import TechnicianWorkload from '@/pages/Technicians/TechnicianWorkload'
import AuditLogs from '@/pages/Audit/AuditLogs'
import AdminPanel from '@/pages/Admin/AdminPanel'

// Utilities
import { initializeNotifications } from '@/services/notifications'

function App() {
  const { user, setUser, setLoading } = useAuthStore()
  const { initialize: initializeNotifications } = useNotificationStore()

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error checking auth state:', error)
      } finally {
        setLoading(false)
      }
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Initialize notifications for authenticated users
          await initializeNotifications()
        }
      }
    )

    checkAuth()

    return () => subscription.unsubscribe()
  }, [setUser, setLoading, initializeNotifications])

  // Show loading spinner while checking auth
  if (useAuthStore.getState().loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={user ? <Layout /> : <Navigate to="/auth/login" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="system-status" element={<SystemStatus />} />
          <Route path="alerts" element={<AlertManagement />} />
          <Route path="technicians" element={<TechnicianWorkload />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="admin/*" element={<AdminPanel />} />
        </Route>

        {/* Catch all - redirect to dashboard if authenticated, otherwise to login */}
        <Route 
          path="*" 
          element={<Navigate to={user ? "/dashboard" : "/auth/login"} replace />} 
        />
      </Routes>
    </div>
  )
}

export default App
