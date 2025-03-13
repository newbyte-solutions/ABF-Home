#!/bin/bash

# Define the path to your project
PROJECT_PATH="./"

# Define the Docker Compose file (if different from the default, update the name)
COMPOSE_FILE="docker-compose.yml"

# Define the path to the uploads directory
UPLOADS_DIR="server/uploads"
BACKUP_DIR="/tmp/uploads_backup"

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

# Backup uploads directory if it exists
if [ -d "$UPLOADS_DIR" ]; then
    echo "Backing up uploads directory..."
    mkdir -p "$BACKUP_DIR"
    cp -r "$UPLOADS_DIR" "$BACKUP_DIR" || {
        echo "Error: Failed to back up uploads directory."
        exit 1
    }
else
    echo "No existing uploads directory to back up."
fi

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

# Restore uploads directory
echo "Restoring uploads directory..."
if [ -d "$BACKUP_DIR/uploads" ]; then
    mv "$BACKUP_DIR/uploads" "$UPLOADS_DIR" || {
        echo "Error: Failed to restore uploads directory."
        exit 1
    }
    echo "Uploads directory restored successfully."
else
    echo "No backup found to restore."
fi

# Cleanup backup
rm -rf "$BACKUP_DIR"

echo "Update and container restart completed successfully!"
