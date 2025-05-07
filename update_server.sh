#!/bin/bash
set -e

# Define variables
PROJECT_DIR="./ABF-Home"
UPLOADS_DIR="$PROJECT_DIR/server/uploads"
BACKUP_DIR="./backup_uploads"
MONGO_CONTAINER="abf-home-mongodb-1"
MONGO_BACKUP="./mongo_backup"
REPO_URL="git@github.com:newbyte-solutions/ABF-Home.git"

echo "Starting update process..."

# Step 1: Backup uploads
if [ -d "$UPLOADS_DIR" ]; then
    echo "Backing up uploads..."
    rm -rf "$BACKUP_DIR"
    cp -r "$UPLOADS_DIR" "$BACKUP_DIR"
else
    echo "No uploads directory found to backup."
fi

# Step 2: Backup MongoDB data using mongodump (skip if Mongo container not running)
if docker ps --format '{{.Names}}' | grep -q "^$MONGO_CONTAINER\$"; then
    echo "Backing up MongoDB data..."
    docker exec "$MONGO_CONTAINER" mongodump --out /data/backup
    docker cp "$MONGO_CONTAINER":/data/backup "$MONGO_BACKUP"
else
    echo "MongoDB container not found or not running. Skipping MongoDB backup."
    MONGO_BACKUP=""
fi

# Step 3: Run container shutdown, git pull, and container restart in the background
(
    # Stop all containers if docker-compose.yml exists
    if [ -f "$PROJECT_DIR/docker-compose.yml" ]; then
        echo "Stopping all containers..."
        cd "$PROJECT_DIR" && docker compose down
    else
        echo "No docker-compose.yml found. Skipping docker compose down."
    fi

    # Update project via git pull or clone if missing
    if [ -d "$PROJECT_DIR/.git" ]; then
        echo "Project exists. Pulling latest changes..."
        cd "$PROJECT_DIR" && git reset --hard && git pull
    else
        echo "Project folder not found. Cloning repository..."
        git clone "$REPO_URL" "$PROJECT_DIR"
    fi

    # Copy local .env into the project
    if [ -f "/root/config/.env" ]; then
        echo "Copying local .env into project..."
        cp /root/config/.env "$PROJECT_DIR/server/config/.env"
    else
        echo "Error: .env file not found in /root/config/"
        exit 1
    fi

    # Start new containers (including MongoDB if defined in compose)
    echo "Starting docker compose with build..."
    cd "$PROJECT_DIR" && docker compose up --build -d

    echo "Update process completed successfully."
) &  # Run the whole update process in the background

# Step 4: Immediately send a response to GitHub webhook
echo "Update process started. You can track the progress in the logs."

