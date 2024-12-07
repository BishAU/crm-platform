#!/bin/bash

# Production ports
PROD_PORTS=(3000 4000 5000 6000)
# Development ports 
DEV_PORTS=(3001 4001 5001 6001)

cleanup_ports() {
    local ports=("$@")
    for port in "${ports[@]}"; do
        pid=$(lsof -ti:$port)
        if [ ! -z "$pid" ]; then
            echo "Killing process on port $port (PID: $pid)"
            kill -9 $pid
        fi
    done
}

case "$1" in
    "prod")
        echo "Cleaning up production ports..."
        cleanup_ports "${PROD_PORTS[@]}"
        ;;
    "dev")
        echo "Cleaning up development ports..."
        cleanup_ports "${DEV_PORTS[@]}"
        ;;
    *)
        echo "Cleaning up all ports..."
        cleanup_ports "${PROD_PORTS[@]}" "${DEV_PORTS[@]}"
        ;;
esac
