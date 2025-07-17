# NOC Dashboard System - Plugins Fiber

A comprehensive Network Operations Center (NOC) dashboard system with web and mobile interfaces for monitoring network infrastructure, managing alerts, and coordinating field technicians.

## 🏗️ Architecture

- **Web Dashboard**: React + TypeScript + Tailwind CSS
- **Mobile App**: React Native for field technicians  
- **Backend**: Node.js + Express + Supabase
- **Real-time**: WebSockets + Push Notifications
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Google Maps API / Mapbox
- **Charts**: Chart.js / Recharts

## 📱 Applications

### Web Dashboard (`/apps/web`)
- **Dashboard Home**: Alert summaries, traffic charts, device status
- **System Status Panel**: Real-time device health, SLA monitoring
- **Alert Management**: Heatmaps, escalation, technician assignment
- **Workload Management**: Technician metrics and zone filtering
- **Audit Logs**: Change tracking and compliance
- **Admin Controls**: Role-based access, reporting

### Mobile App (`/apps/mobile`)
- **Technician Interface**: Real-time alerts and task management
- **Field Operations**: Photo uploads, diagnostics, routing
- **Communication**: Team chat and dispatch coordination
- **Offline Support**: Critical functions work without connectivity

### Backend (`/apps/backend`)
- **API Gateway**: RESTful APIs for all operations
- **Real-time Engine**: WebSocket connections and notifications
- **Alert Processing**: AI-powered root cause analysis
- **Integration Layer**: Device monitoring and external systems

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- Google Maps API key (optional)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd NOC-Project
   npm run install:all
   ```

2. **Environment Setup**:
   ```bash
   # Copy environment templates
   cp apps/web/.env.example apps/web/.env.local
   cp apps/backend/.env.example apps/backend/.env
   cp apps/mobile/.env.example apps/mobile/.env
   ```

3. **Configure Supabase**:
   - Create a new Supabase project
   - Add your Supabase URL and anon key to environment files
   - Run database migrations (see `/apps/backend/supabase/`)

4. **Start Development**:
   ```bash
   # Start web + backend
   npm run dev
   
   # Start mobile app (separate terminal)
   npm run dev:mobile
   ```

## 🔑 Key Features

### 🌐 Web Dashboard
- **Real-time Monitoring**: Live device status, traffic metrics, SLA tracking
- **Alert Management**: Interactive heatmaps, bulk operations, escalation workflows
- **Technician Workload**: Zone-based filtering, capacity planning, performance metrics
- **System Health**: Interactive network maps, fiber cut detection, device diagnostics
- **Audit & Compliance**: Complete change tracking, exportable reports
- **Push Notifications**: Browser notifications with SMS fallback

### 📱 Mobile App
- **Field-Ready**: Offline capabilities, GPS integration, camera uploads
- **Real-time Sync**: Instant alert notifications, live task updates
- **Team Coordination**: Built-in chat, dispatch communication
- **Device Management**: Remote ping, diagnostics, LOS verification
- **SLA Tracking**: Visual countdown timers, breach notifications

### 🤖 AI Integration (Optional)
- **Root Cause Analysis**: Pattern recognition in historical data
- **Smart Prioritization**: Automatic severity assessment
- **Predictive Analytics**: Proactive maintenance suggestions

## 📊 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js/Recharts** for data visualization
- **React Query** for data fetching
- **Zustand** for state management

### Mobile
- **React Native** with TypeScript
- **React Navigation** for routing
- **React Native Maps** for location services
- **Expo** for rapid development

### Backend
- **Node.js** with Express
- **Supabase** for database and auth
- **Socket.io** for real-time communication
- **Bull Queue** for background jobs
- **Winston** for logging

### Infrastructure
- **Supabase** (Database, Auth, Storage, Functions)
- **Vercel/Netlify** (Web deployment)
- **Railway/Heroku** (Backend deployment)
- **Expo EAS** (Mobile app distribution)

## 🛡️ Security & Access Control

### Role-Based Access
- **Admin**: Full system access, user management, configuration
- **Analyst**: Alert management, reporting, system monitoring  
- **Manager**: Dashboard views, team metrics, SLA reports
- **Technician**: Mobile app, assigned tasks, field operations
- **Viewer**: Read-only dashboard access

### Security Features
- **JWT Authentication** via Supabase
- **Role-based permissions** at API level
- **Data encryption** in transit and at rest
- **Audit logging** for all operations
- **Rate limiting** and DDoS protection

## 📈 Monitoring & Analytics

### Metrics Dashboard
- **Alert Response Times**: Average resolution time by severity/zone
- **SLA Performance**: Breach rates, trend analysis, forecasting
- **Technician Efficiency**: Workload distribution, completion rates
- **System Health**: Device uptime, performance metrics, capacity utilization

### Reporting
- **Automated Reports**: Weekly SLA summaries, trend analysis
- **Export Options**: PDF reports, CSV data exports
- **Custom Dashboards**: Configurable widgets and layouts

## 🔧 Development

### Project Structure
```
NOC-Project/
├── apps/
│   ├── web/           # React web dashboard
│   ├── mobile/        # React Native mobile app
│   └── backend/       # Node.js API server
├── packages/
│   ├── shared/        # Shared utilities and types
│   └── ui/            # Shared UI components
├── docs/             # Documentation
└── scripts/          # Build and deployment scripts
```

### Code Quality
- **TypeScript** for type safety
- **ESLint + Prettier** for code formatting
- **Husky** for pre-commit hooks
- **Jest** for unit testing
- **Cypress** for E2E testing

## 🚢 Deployment

### Production Deployment
1. **Web Dashboard**: Deploy to Vercel/Netlify
2. **Backend API**: Deploy to Railway/Heroku
3. **Mobile App**: Distribute via Expo EAS or App Stores
4. **Database**: Hosted on Supabase

### Environment Configuration
- Development: Local development with hot reload
- Staging: Preview deployments for testing
- Production: Optimized builds with monitoring

## 📞 Support & Contributing

### Getting Help
- Check the [documentation](./docs/)
- Review [API documentation](./apps/backend/docs/)
- Submit issues via GitHub

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is proprietary software for Plugins Fiber NOC operations.

---

**Built with ❤️ for Plugins Fiber Network Operations**
