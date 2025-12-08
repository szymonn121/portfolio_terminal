#!/bin/bash

# Portfolio Deployment Script
# Quick commands for deploying and managing the portfolio

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Portfolio Deployment Helper${NC}"
echo "================================"
echo ""

# Function to build Docker image
build() {
    echo -e "${GREEN}Building Docker image...${NC}"
    docker build -t portfolio:latest .
    echo -e "${GREEN}✓ Build complete!${NC}"
}

# Function to run container
run() {
    echo -e "${GREEN}Starting container...${NC}"
    docker run -d \
        --name portfolio \
        --restart unless-stopped \
        -p 3000:3000 \
        portfolio:latest
    echo -e "${GREEN}✓ Container started on http://localhost:3000${NC}"
}

# Function to stop and remove container
stop() {
    echo -e "${BLUE}Stopping container...${NC}"
    docker stop portfolio 2>/dev/null || echo "Container not running"
    docker rm portfolio 2>/dev/null || echo "Container not found"
    echo -e "${GREEN}✓ Container stopped${NC}"
}

# Function to view logs
logs() {
    echo -e "${BLUE}Container logs:${NC}"
    docker logs -f portfolio
}

# Function to restart
restart() {
    stop
    run
}

# Function to rebuild and restart
rebuild() {
    stop
    build
    run
}

# Function to clean up
clean() {
    echo -e "${BLUE}Cleaning up...${NC}"
    docker stop portfolio 2>/dev/null
    docker rm portfolio 2>/dev/null
    docker rmi portfolio:latest 2>/dev/null
    docker system prune -f
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

# Function to show status
status() {
    echo -e "${BLUE}Container status:${NC}"
    docker ps -a | grep portfolio || echo "No portfolio container found"
    echo ""
    echo -e "${BLUE}Image status:${NC}"
    docker images | grep portfolio || echo "No portfolio image found"
}

# Main menu
case "$1" in
    build)
        build
        ;;
    run)
        run
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    rebuild)
        rebuild
        ;;
    logs)
        logs
        ;;
    clean)
        clean
        ;;
    status)
        status
        ;;
    *)
        echo "Usage: $0 {build|run|stop|restart|rebuild|logs|clean|status}"
        echo ""
        echo "Commands:"
        echo "  build    - Build Docker image"
        echo "  run      - Run container"
        echo "  stop     - Stop and remove container"
        echo "  restart  - Restart container"
        echo "  rebuild  - Rebuild image and restart"
        echo "  logs     - View container logs"
        echo "  clean    - Remove all portfolio containers and images"
        echo "  status   - Show container and image status"
        exit 1
        ;;
esac
