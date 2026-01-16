# IoT Hackathon 2026

A smart washing machine monitoring system built with IoT sensors and real-time web monitoring.

## Project Structure

```
iot-hackathon-2026/
├── backend/          # Express.js API with Drizzle ORM & Turso
├── web/              # Next.js frontend application
├── nodemcu/          # Arduino code for NodeMCU/ESP32
└── docker-compose.yml # Docker orchestration
```

## Authors

- Zayar Lin
- Thu Htin Thit
- Kyaw Htet Naing

## Quick Start with Docker

See [DOCKER.md](DOCKER.md) for detailed Docker setup instructions.

```bash
# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d --build

# Access the applications
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
```

## Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Web
```bash
cd web
npm install
npm run dev
```

### NodeMCU/ESP32
Open `nodemcu/nodemcu.ino` in Arduino IDE and upload to your device.

## License

MIT License - See [LICENSE](LICENSE) for details.
