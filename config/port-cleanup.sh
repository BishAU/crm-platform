#!/bin/bash

# Production ports (X000)
PROD_PORTS=(
    3000  # VCC Platform
    3100  # CRM Platform
    3200  # WWW Platform
    3300  # Raffle Platform
    3400  # Skyhigh Platform Frontend
    3410  # Skyhigh Platform Backend
    3500  # Spraybooth Platform
    3600  # Rockregister Platform
    3700  # tradertokenbot
    3800  # Kuma Platform
    3002  # ABS API
)

# Development ports (X001)
DEV_PORTS=(
    3001  # VCC Platform Dev
    3101  # CRM Platform Dev
    3201  # WWW Platform Dev
    3301  # Raffle Platform Dev
    3401  # Skyhigh Platform Frontend Dev
    3411  # Skyhigh Platform Backend Dev
    3501  # Spraybooth Platform Dev
    3601  # Rockregister Platform Dev
    3701  # tradertokenbot Dev
    3801  # Kuma Platform Dev
    3003  # ABS API Dev
)

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
        if [ "$#" -gt 0 ]; then
            echo "Cleaning up specified ports..."
            cleanup_ports "$@"
        else
            echo "Cleaning up all ports..."
            cleanup_ports "${PROD_PORTS[@]}" "${DEV_PORTS[@]}"
        fi
        ;;
esac

echo "Port cleanup completed"
