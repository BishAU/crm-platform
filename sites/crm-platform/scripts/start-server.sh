#!/bin/bash

# Kill any process using port 4000
sudo fuser -k 4000/tcp || true

# Wait a moment for the port to be freed
sleep 2

# Start the monitoring and server
npm run start:prod
