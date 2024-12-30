#!/bin/bash

echo "Stopping all existing PM2 processes..."
pm2 delete all

echo "Building CRM Platform..."
cd /home/bish/Downloads/crm-platform && npm run build

echo "Starting VCC Platform (port 3000)..."
cd /home/bish/Downloads/vcc-platform && pm2 start npm --name vcc -- start

echo "Starting CRM Platform (port 4000)..."
cd /home/bish/Downloads/crm-platform && pm2 start npm --name crm -- start -- -p 4000

echo "Starting Raffle Platform (port 6000)..."
cd /home/bish/Downloads/raffle-platform && pm2 start npm --name raffle -- start

echo "Starting Skyhigh Platform (port 11000)..."
cd /home/bish/Downloads/skyhigh-platform && pm2 start npm --name skyhigh -- start

echo "Saving PM2 process list..."
pm2 save

echo "All services started. Checking ports..."
sleep 5
lsof -i :3000,4000,5000,6000,11000

echo "Done! Check the logs with: pm2 logs"
