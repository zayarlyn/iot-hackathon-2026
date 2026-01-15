# IoT Hackathon Backend - Docker

## Quick Start

### Using Docker Compose (Recommended)

1. Copy `.env.example` to `.env` and fill in your environment variables:

   ```bash
   cp .env.example .env
   ```

2. Build and run the container:

   ```bash
   npm run docker:run
   ```

3. View logs:

   ```bash
   npm run docker:logs
   ```

4. Stop the container:
   ```bash
   npm run docker:stop
   ```

### Using Docker Directly

1. Build the image:

   ```bash
   npm run docker:build
   ```

2. Run the container:
   ```bash
   docker run -d \
     -p 8080:8080 \
     -e DATABASE_URL=your_turso_url \
     -e DATABASE_AUTH_TOKEN=your_auth_token \
     -e PORT=8080 \
     --name iot-backend \
     iot-hackathon-backend
   ```

## Environment Variables

- `PORT` - Server port (default: 8080)
- `DATABASE_URL` - Turso database connection URL
- `DATABASE_AUTH_TOKEN` - Turso authentication token

## API Endpoints

- `GET /` - Welcome message
- `GET /get-status/:id` - Get device status
- `POST /update-status/:id` - Update device status
