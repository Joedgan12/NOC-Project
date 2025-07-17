// React component for Enhanced Dashboard
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const EnhancedDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('event', (event) => {
      console.log('Received event:', event);
      setEvents((prevEvents) => [...prevEvents, event]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatEvent = (event: any) => {
    return `${event.type.toUpperCase()} - ${event.payload.message} (Timestamp: ${new Date(event.timestamp).toLocaleString()})`;
  };

  return (
    <div>
      <h1>Enhanced Dashboard</h1>
      <p>Welcome to the enhanced dashboard!</p>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{formatEvent(event)}</li>
        ))}
      </ul>
    </div>
  );
};

export default EnhancedDashboard;
