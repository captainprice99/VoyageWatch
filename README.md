# VoyageWatch

A real-time community-driven map for Sea of Thieves events and sightings.

## Features

- Real-time event tracking (shipwrecks, Meg sightings, Ashen Lords, etc.)
- Interactive map with custom Sea of Thieves styling
- Different marker types for PvP and PvE events
- Alliance mode for crew/faction-specific events
- Heatmap visualization for event hotspots
- WebSocket-based real-time updates

## Tech Stack

### Backend
- Java 17
- Spring Boot
- WebSocket for real-time communication
- MongoDB for event storage
- Redis for caching and TTL management

### Frontend
- React 18
- TypeScript
- Leaflet.js for map visualization
- TailwindCSS for styling
- Socket.IO client for real-time updates

## Project Structure

```
voyagewatch/
├── backend/           # Spring Boot application
├── frontend/          # React application
├── docker/            # Docker configuration
└── docs/             # Documentation
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MongoDB
- Redis
- Docker 

### Development Setup

1. Clone the repository
2. Start MongoDB and Redis
3. Run the backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
4. Run the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## License

MIT License