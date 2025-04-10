import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EventType } from '../types/EventType';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Event {
  id: string;
  eventType: EventType;
  latitude: number;
  longitude: number;
  description: string;
  reportedBy: string;
  reportedAt: string;
  isPvP: boolean;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<EventType | 'ALL'>('ALL');

  // WebSocket connection for real-time updates
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');
    
    socket.onmessage = (event) => {
      const newEvent = JSON.parse(event.data);
      setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const filteredEvents = selectedEventType === 'ALL' 
    ? events 
    : events.filter(event => event.eventType === selectedEventType);

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 p-4 bg-white shadow-lg z-[1000]">
        <select 
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value as EventType | 'ALL')}
          className="p-2 border rounded"
        >
          <option value="ALL">All Events</option>
          {Object.values(EventType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredEvents.map(event => (
          <Marker 
            key={event.id} 
            position={[event.latitude, event.longitude]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{event.eventType}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  Reported by: {event.reportedBy}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(event.reportedAt).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App; 