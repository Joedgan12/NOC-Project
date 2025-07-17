import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/authStore'
import { showNotification } from '@/services/notifications'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        showNotification('Login Failed', error.message, 'error')
      } else {
        showNotification('Welcome back!', 'Successfully logged in', 'success')
      }
    } catch (error) {
      console.error('Login error:', error)
      showNotification('Login Failed', 'An unexpected error occurred', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Sign in to your account
        </h2>
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          className="form-input"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="form-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          autoComplete="current-password"
          className="form-input"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loading-spinner mr-2"></div>
            Signing in...
          </div>
        ) : (
          'Sign in'
        )}
      </button>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Demo Accounts</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              const form = { email: 'admin@pluginsfiber.com', password: 'admin123' }
              onSubmit(form)
            }}
            className="btn-outline text-xs"
          >
            Admin Demo
          </button>
          <button
            type="button"
            onClick={() => {
              const form = { email: 'tech@pluginsfiber.com', password: 'tech123' }
              onSubmit(form)
            }}
            className="btn-outline text-xs"
          >
            Tech Demo
          </button>
        </div>
      </div>
    </form>
  )
}
