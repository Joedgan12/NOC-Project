import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database table names
export const TABLES = {
  USERS: 'users',
  ALERTS: 'alerts',
  DEVICES: 'devices',
  TECHNICIANS: 'technicians',
  TICKETS: 'tickets',
  SLA_TARGETS: 'sla_targets',
  SLA_BREACHES: 'sla_breaches',
  AUDIT_LOGS: 'audit_logs',
  NOTIFICATIONS: 'notifications',
  NETWORK_NODES: 'network_nodes',
  NETWORK_LINKS: 'network_links'
} as const
