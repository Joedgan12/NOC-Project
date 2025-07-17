import { create } from 'zustand'
import type { Notification as NotificationData } from '@/types'

interface NotificationState {
  notifications: NotificationData[]
  unreadCount: number
  isEnabled: boolean
  registration: ServiceWorkerRegistration | null
  
  // Actions
  addNotification: (notification: NotificationData) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  setEnabled: (enabled: boolean) => void
  setRegistration: (registration: ServiceWorkerRegistration | null) => void
  initialize: () => Promise<void>
  filterNotifications: (criteria: Partial<NotificationData>) => NotificationData[]
  searchNotifications: (query: string) => NotificationData[]
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isEnabled: false,
  registration: null,

  addNotification: (notification) => {
    set((state) => {
      const newNotifications = [notification, ...state.notifications]
      const unreadCount = newNotifications.filter(n => !n.read).length
      
      // Show browser notification if enabled
      if (state.isEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: notification.id,
        })
      }
      
      return {
        notifications: newNotifications.slice(0, 100), // Keep only latest 100
        unreadCount
      }
    })
  },

  markAsRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
      const unreadCount = notifications.filter(n => !n.read).length
      
      return { notifications, unreadCount }
    })
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }))
  },

  removeNotification: (id) => {
    set((state) => {
      const notifications = state.notifications.filter(n => n.id !== id)
      const unreadCount = notifications.filter(n => !n.read).length
      
      return { notifications, unreadCount }
    })
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  },

  setEnabled: (enabled) => {
    set({ isEnabled: enabled })
  },

  setRegistration: (registration) => {
    set({ registration })
  },

  initialize: async () => {
    try {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        const permission = await Notification.requestPermission()
        set({ isEnabled: permission === 'granted' })
      } else {
        set({ isEnabled: Notification.permission === 'granted' })
      }

      // Register service worker for push notifications
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js')
        set({ registration })
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error)
    }
  },

  filterNotifications: (criteria) => {
    const { notifications } = get();
    return notifications.filter((notification) => {
      return Object.keys(criteria).every((key) => {
        return notification[key] === criteria[key];
      });
    });
  },

  searchNotifications: (query) => {
    const { notifications } = get();
    return notifications.filter((notification) => {
      return (
        notification.title.toLowerCase().includes(query.toLowerCase()) ||
        notification.message.toLowerCase().includes(query.toLowerCase())
      );
    });
  },
}))
