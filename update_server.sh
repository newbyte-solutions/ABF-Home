#!/bin/bash

# Define the path to your project
PROJECT_PATH="./"

# Define the Docker Compose file (if different from the default, update the name)
COMPOSE_FILE="docker-compose.yml"

# Define the path to the uploads directory
UPLOADS_DIR="./server/uploads"

# Navigate to the project directory
cd "$PROJECT_PATH" || {
    echo "Error: Unable to access the project directory: $PROJECT_PATH"
    exit 1
}

# Backup MongoDB data and uploads directory
echo "Creating backup of MongoDB data and uploads directory..."
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T mongodb mongodump --out=/data/backup_${BACKUP_DATE} || {
    echo "Error: Failed to backup MongoDB data"
    exit 1
}
cp -r "$UPLOADS_DIR" "${UPLOADS_DIR}_backup_${BACKUP_DATE}" || {
    echo "Error: Failed to backup uploads directory"
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

# Restore MongoDB data and uploads directory
echo "Restoring MongoDB data and uploads directory..."
docker-compose exec -T mongodb mongorestore /data/backup_${BACKUP_DATE} || {
    echo "Error: Failed to restore MongoDB data"
    exit 1
}
rm -rf "$UPLOADS_DIR"
cp -r "${UPLOADS_DIR}_backup_${BACKUP_DATE}" "$UPLOADS_DIR" || {
    echo "Error: Failed to restore uploads directory"
    exit 1
}

echo "Update and container restart completed successfully!"