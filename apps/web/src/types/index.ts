// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  created_at: string
  updated_at: string
}

export type UserRole = 'admin' | 'analyst' | 'manager' | 'technician' | 'viewer'

export interface AuthSession {
  user: User
  access_token: string
  refresh_token: string
  expires_at: number
}

// Alert Types
export interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  status: AlertStatus
  source: string
  device_id?: string
  technician_id?: string
  zone: string
  created_at: string
  updated_at: string
  resolved_at?: string
  escalated_at?: string
  sla_breach_at?: string
  tags: string[]
  metadata: Record<string, any>
}

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'
export type AlertStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'escalated' | 'closed'

// Device Types
export interface Device {
  id: string
  name: string
  type: DeviceType
  status: DeviceStatus
  ip_address: string
  location: string
  zone: string
  model?: string
  firmware_version?: string
  last_seen: string
  uptime: number
  metrics: DeviceMetrics
  created_at: string
  updated_at: string
}

export type DeviceType = 'olt' | 'bng' | 'router' | 'server' | 'switch' | 'client'
export type DeviceStatus = 'online' | 'offline' | 'warning' | 'maintenance'

export interface DeviceMetrics {
  cpu_usage: number
  memory_usage: number
  bandwidth_in: number
  bandwidth_out: number
  latency: number
  packet_loss: number
  temperature?: number
  power_consumption?: number
}

// Technician Types
export interface Technician {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  zone: string
  status: TechnicianStatus
  skills: string[]
  current_workload: number
  max_workload: number
  location?: {
    lat: number
    lng: number
    updated_at: string
  }
  created_at: string
  updated_at: string
}

export type TechnicianStatus = 'available' | 'busy' | 'offline' | 'break'

// Ticket Types
export interface Ticket {
  id: string
  alert_id: string
  technician_id?: string
  title: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  category: string
  estimated_resolution_time?: number
  actual_resolution_time?: number
  sla_deadline: string
  notes: TicketNote[]
  attachments: TicketAttachment[]
  created_at: string
  updated_at: string
  resolved_at?: string
}

export type TicketPriority = 'urgent' | 'high' | 'normal' | 'low'
export type TicketStatus = 'open' | 'assigned' | 'in_progress' | 'pending' | 'resolved' | 'closed'

export interface TicketNote {
  id: string
  ticket_id: string
  user_id: string
  content: string
  is_internal: boolean
  created_at: string
}

export interface TicketAttachment {
  id: string
  ticket_id: string
  filename: string
  url: string
  size: number
  mime_type: string
  uploaded_by: string
  created_at: string
}

// SLA Types
export interface SLATarget {
  id: string
  name: string
  description: string
  severity: AlertSeverity
  response_time_minutes: number
  resolution_time_minutes: number
  escalation_time_minutes: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SLABreach {
  id: string
  alert_id: string
  ticket_id?: string
  sla_target_id: string
  breach_type: 'response' | 'resolution' | 'escalation'
  expected_time: string
  actual_time?: string
  duration_minutes?: number
  status: 'active' | 'resolved'
  created_at: string
  resolved_at?: string
}

// Network Topology Types
export interface NetworkNode {
  id: string
  name: string
  type: 'olt' | 'bng' | 'router' | 'server' | 'client' | 'junction'
  position: {
    lat: number
    lng: number
  }
  status: DeviceStatus
  connections: string[] // IDs of connected nodes
  metadata: Record<string, any>
}

export interface NetworkLink {
  id: string
  source_id: string
  target_id: string
  type: 'fiber' | 'copper' | 'wireless'
  status: 'active' | 'inactive' | 'cut' | 'maintenance'
  bandwidth_capacity: number
  current_utilization: number
  length_km?: number
  metadata: Record<string, any>
}

// Analytics Types
export interface DashboardMetrics {
  total_alerts: number
  open_tickets: number
  active_technicians: number
  sla_breaches: number
  network_uptime: number
  average_resolution_time: number
  alert_trends: {
    date: string
    count: number
    severity_breakdown: Record<AlertSeverity, number>
  }[]
  workload_distribution: {
    technician_id: string
    name: string
    current_workload: number
    zone: string
  }[]
}

// Notification Types
export interface Notification {
  id: string
  user_id?: string
  title: string
  message: string
  type: NotificationType
  priority: 'low' | 'normal' | 'high' | 'urgent'
  read: boolean
  action_url?: string
  metadata: Record<string, any>
  created_at: string
}

export type NotificationType = 
  | 'alert_created'
  | 'alert_assigned'
  | 'alert_escalated'
  | 'sla_breach'
  | 'system_update'
  | 'maintenance_scheduled'

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface ApiError {
  error: string
  message: string
  details?: Record<string, any>
}

// Chart and Analytics Types
export interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
  color?: string
}

export interface TimeSeriesData {
  timestamp: string
  value: number
  metadata?: Record<string, any>
}

// Filter and Search Types
export interface AlertFilters {
  severity?: AlertSeverity[]
  status?: AlertStatus[]
  zone?: string[]
  technician_id?: string
  date_range?: {
    start: string
    end: string
  }
  search?: string
}

export interface DeviceFilters {
  type?: DeviceType[]
  status?: DeviceStatus[]
  zone?: string[]
  search?: string
}

// Real-time Event Types
export interface RealtimeEvent {
  type: string
  payload: any
  timestamp: string
}

export interface AlertEvent extends RealtimeEvent {
  type: 'alert_created' | 'alert_updated' | 'alert_resolved'
  payload: Alert
}

export interface DeviceEvent extends RealtimeEvent {
  type: 'device_status_changed' | 'device_metrics_updated'
  payload: Device
}

// Form Types
export interface CreateAlertForm {
  title: string
  description: string
  severity: AlertSeverity
  source: string
  device_id?: string
  zone: string
  tags: string[]
}

export interface AssignTicketForm {
  technician_id: string
  priority: TicketPriority
  estimated_resolution_time?: number
  notes?: string
}

// Configuration Types
export interface AppConfig {
  api_url: string
  websocket_url: string
  supabase_url: string
  supabase_anon_key: string
  maps_api_key?: string
  notification_settings: {
    browser_push: boolean
    sms_fallback: boolean
    email_notifications: boolean
  }
  sla_settings: {
    auto_escalation: boolean
    breach_notifications: boolean
    weekend_sla: boolean
  }
}
