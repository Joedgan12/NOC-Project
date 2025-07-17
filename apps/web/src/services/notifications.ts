import { useNotificationStore } from '@/stores/notificationStore'

export async function initializeNotifications() {
  const store = useNotificationStore.getState()
  await store.initialize()
}

export function showNotification(
  title: string,
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info'
) {
  const store = useNotificationStore.getState()
  
  const notification = {
    id: crypto.randomUUID(),
    title,
    message,
    type: type as any,
    priority: 'normal' as const,
    read: false,
    created_at: new Date().toISOString(),
    metadata: {}
  }
  
  store.addNotification(notification)
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    return Notification.requestPermission()
  }
  return Promise.resolve(Notification.permission)
}

export async function subscribeToWebPush() {
  try {
    const store = useNotificationStore.getState()
    const registration = store.registration
    
    if (!registration) {
      throw new Error('Service worker not registered')
    }

    const vapidPublicKey = (import.meta as any).env.VITE_VAPID_PUBLIC_KEY || '';

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    })

    // Send subscription to server
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })

    return subscription
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error)
    throw error
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
