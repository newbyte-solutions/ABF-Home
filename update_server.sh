#!/bin/bash

# Define the path to your project
PROJECT_PATH="./"

# Define the Docker Compose file (if different from the default, update the name)
COMPOSE_FILE="docker-compose.yml"

# Navigate to the project directory
cd "$PROJECT_PATH" || {
    echo "Error: Unable to access the project directory: $PROJECT_PATH"
    exit 1
}

# Pull the latest changes from the repository
echo "Pulling the latest changes from the repository..."
git pull || {
    echo "Error: Failed to pull updates. Check your git configuration."
    exit 1
}

# Restart the Docker containers
echo "Restarting the Docker containers..."
if [ -f "$COMPOSE_FILE" ]; then
    docker-compose down && docker-compose up -d || {
        echo "Error: Failed to restart containers."
        exit 1
    }
else
    echo "Error: Docker Compose file not found in $PROJECT_PATH."
    exit 1
fi

echo "Update and container restart completed successfully!"
