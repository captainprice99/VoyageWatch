import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EventType } from './types/EventType';

// Fix for default marker icons in Leaflet with React
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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

const MapEvents = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<EventType | 'ALL'>('ALL');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    eventType: EventType.SHIPWRECK,
    description: '',
    reportedBy: 'Anonymous',
    isPvP: false
  });

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

  const handleMapClick = (lat: number, lng: number) => {
    if (isAddingEvent) {
      setNewEvent(prev => ({ ...prev, latitude: lat, longitude: lng }));
    }
  };

  const handleAddEvent = () => {
    if (newEvent.latitude && newEvent.longitude) {
      const eventToAdd: Event = {
        id: Date.now().toString(),
        eventType: newEvent.eventType as EventType,
        latitude: newEvent.latitude,
        longitude: newEvent.longitude,
        description: newEvent.description || '',
        reportedBy: newEvent.reportedBy || 'Anonymous',
        reportedAt: new Date().toISOString(),
        isPvP: newEvent.isPvP || false
      };

      setEvents(prev => [...prev, eventToAdd]);
      setIsAddingEvent(false);
      setNewEvent({
        eventType: EventType.SHIPWRECK,
        description: '',
        reportedBy: 'Anonymous',
        isPvP: false
      });
    }
  };

  const filteredEvents = selectedEventType === 'ALL' 
    ? events 
    : events.filter(event => event.eventType === selectedEventType);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="p-4 bg-white shadow-lg z-[1000] flex justify-between items-center">
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

        <div className="flex gap-4">
          <button
            onClick={() => setIsAddingEvent(!isAddingEvent)}
            className={`px-4 py-2 rounded ${isAddingEvent ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            {isAddingEvent ? 'Cancel' : 'Add Event'}
          </button>
        </div>
      </div>
      
      {isAddingEvent && (
        <div className="p-4 bg-white shadow-lg z-[1000]">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={newEvent.eventType}
              onChange={(e) => setNewEvent(prev => ({ ...prev, eventType: e.target.value as EventType }))}
              className="p-2 border rounded"
            >
              {Object.values(EventType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Your name"
              value={newEvent.reportedBy}
              onChange={(e) => setNewEvent(prev => ({ ...prev, reportedBy: e.target.value }))}
              className="p-2 border rounded"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEvent.isPvP}
                onChange={(e) => setNewEvent(prev => ({ ...prev, isPvP: e.target.checked }))}
              />
              PvP Event
            </label>
          </div>
          <button
            onClick={handleAddEvent}
            disabled={!newEvent.latitude || !newEvent.longitude}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          >
            Add Event
          </button>
        </div>
      )}
      
      <div className="flex-1">
        <MapContainer 
          center={[0, 0]} 
          zoom={2} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents onMapClick={handleMapClick} />
          
          {filteredEvents.map(event => (
            <Marker 
              key={event.id} 
              position={[event.latitude, event.longitude]}
              icon={icon}
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
                  {event.isPvP && <span className="text-red-500">PvP Event</span>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App; 