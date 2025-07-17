import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  isAuthenticated: () => boolean
  hasRole: (role: string | string[]) => boolean
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user }),
      
      setLoading: (loading) => set({ loading }),

      logout: () => set({ user: null }),

      isAuthenticated: () => {
        const { user } = get()
        return user !== null
      },

      hasRole: (role) => {
        const { user } = get()
        if (!user) return false
        
        if (Array.isArray(role)) {
          return role.includes(user.role)
        }
        return user.role === role
      },

      isAdmin: () => {
        const { user } = get()
        return user?.role === 'admin'
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
