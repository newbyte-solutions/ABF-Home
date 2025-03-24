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

# Step 3: Stop all containers (if docker-compose.yml exists)
if [ -f "$PROJECT_DIR/docker-compose.yml" ]; then
    echo "Stopping all containers..."
    (cd "$PROJECT_DIR" && docker compose down)
else
    echo "No docker-compose.yml found. Skipping docker compose down."
fi

# Step 4: Remove the old project folder
echo "Removing old ABF-Home folder..."
rm -rf "$PROJECT_DIR"

# Step 5: Clone the latest version from GitHub
echo "Cloning the latest ABF-Home repo..."
git clone "$REPO_URL"

# Step 5.1: Copy local .env into the project
if [ -f "/root/config/.env" ]; then
    echo "Copying local .env into project..."
    mkdir "$PROJECT_DIR/server/config/" 
    cp /root/config/.env "$PROJECT_DIR/server/config/.env"
else
    echo "Error: .env file not found in /root/config/"
    exit 1
fi

# Step 7: Start new containers (including MongoDB if defined in compose)
echo "Starting docker compose with build..."
(cd "$PROJECT_DIR" && docker compose up --build -d)

# Step 8: Restore MongoDB data if backup exists
if [ -n "$MONGO_BACKUP" ]; then
    echo "Restoring MongoDB data..."
    # Give MongoDB some time to start
    sleep 10
    NEW_MONGO_CONTAINER=$(docker ps --filter "name=$MONGO_CONTAINER" --format "{{.Names}}")
    if [ -n "$NEW_MONGO_CONTAINER" ]; then
        docker cp "$MONGO_BACKUP/backup" "$NEW_MONGO_CONTAINER":/data/backup
        docker exec "$NEW_MONGO_CONTAINER" mongorestore /data/backup
        echo "MongoDB data restored."
    else
        echo "MongoDB container not found after compose up. Skipping MongoDB restore."
    fi
else
    echo "No MongoDB backup found. Skipping MongoDB restore."
fi

echo "Update process completed successfully."
