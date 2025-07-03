# 🗺️ VoyageWatch - Sea of Thieves Event Tracker 🏴‍☠️

> ⚡ Real-time community-driven map for tracking Sea of Thieves events, sightings, and treasures!

## 🌟 Features

- 🗺️ Interactive map of the Sea of Thieves world
- ⚡ Real-time event tracking
  - 🚢 Shipwrecks
  - 🦈 Megalodon sightings
  - 👑 Ashen Lords
  - 💀 Reaper's Bones sightings
  - 🤝 Alliance formations
  - 🏰 Forts of Fortune
  - 💀 Forts of the Damned
  - ⚓ Skeleton Fleets
  - 👻 Ghost Fleets
  - 🗺️ Treasure Maps
  - 📦 Merchant Contracts
  - 🏴 Emissary Flags
- 🎯 Custom marker icons for different event types
- 🔥 Heatmap visualization for event hotspots
- 👥 Alliance mode for crew/faction-specific events
- ⏱️ Event expiration and TTL management
- 📊 Event reliability scoring system

## 🛠️ Tech Stack

### Backend
- ☕ Java 17
- 🌱 Spring Boot
- 🔌 WebSocket for real-time communication
- 🍃 MongoDB for event storage
- 🔴 Redis for caching and TTL management

### Frontend
- ⚛️ React 18
- 📘 TypeScript
- 🍃 Leaflet.js for map visualization
- 🎨 TailwindCSS for styling
- 🔌 Socket.IO client for real-time updates

## 🏗️ Project Structure

```
voyagewatch/
├── backend/           # Spring Boot application
├── frontend/          # React application
├── docker/            # Docker configuration
└── docs/             # Documentation
```

## 🚀 Getting Started

### Prerequisites
- ☕ Java 17+
- 📦 Node.js 18+
- 🍃 MongoDB
- 🔴 Redis
- 🐳 Docker (optional)

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/voyagewatch.git
cd voyagewatch
```

2. Start MongoDB and Redis
```bash
# Using Docker
docker-compose up -d mongodb redis
```

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

### 🐳 Docker Deployment

Run the entire stack with Docker Compose:
```bash
docker-compose up --build
```

Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Sea of Thieves community for inspiration
- All contributors who help make this project better
- Rare Ltd. for creating such an amazing game

---

