#!/bin/bash

# Define the path to your project
PROJECT_PATH="./ABF-Home"

# Navigate to the project directory
cd "$PROJECT_PATH" || {
    echo "Error: Unable to access the project directory: $PROJECT_PATH"
    exit 1
}

# Pull the latest changes from the repository
echo "Updating the server..."
git pull || {
    echo "Error: Failed to pull updates. Check your git configuration."
    exit 1
}

echo "Server updated successfully!"
