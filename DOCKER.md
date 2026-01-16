# IoT Hackathon 2026 - Docker Setup

This project consists of two services:

- **Backend**: Express.js API with Drizzle ORM and Turso SQLite
- **Web**: Next.js frontend application

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Turso database account and credentials

### Setup

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```
2. **Configure your `.env` file with your Turso credentials**

   ```env
   PORT=8080
   DATABASE_URL=libsql://your-database-url.turso.io
   DATABASE_AUTH_TOKEN=your-auth-token
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

3. **Build and start all services**

   ```bash
   docker-compose up -d --build
   ```

4. **View logs**

   ```bash
   docker-compose logs -f
   ```

5. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

### Stop Services

```bash
docker-compose down
```

### Rebuild Services

```bash
docker-compose up -d --build
```

## Individual Services

### Backend Only

```bash
docker-compose up backend -d
```

### Web Only

```bash
docker-compose up web -d
```

## Development

For development, you can run services locally without Docker:

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

## Environment Variables

### Backend

- `PORT` - Server port (default: 8080)
- `DATABASE_URL` - Turso database connection URL
- `DATABASE_AUTH_TOKEN` - Turso authentication token

### Web (Next.js)

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8080)

## API Endpoints

- `GET /` - Welcome message
- `GET /get-status/:id` - Get device status
- `POST /update-status/:id` - Update device status

## Architecture

The services are connected through a Docker network (`app-network`), allowing the web service to communicate with the backend using the service name as hostname.

## Troubleshooting

### View container logs

```bash
docker-compose logs backend
docker-compose logs web
```

### Restart a specific service

```bash
docker-compose restart backend
docker-compose restart web
```

### Check service health

```bash
docker-compose ps
```

### Remove all containers and volumes

```bash
docker-compose down -v
```
