#!/bin/bash

echo "Wish me luck..."

BRANCH_NAME="sync/$(date +%Y-%m-%d_%H-%M)"

# Copy the experiments directory
cp -r ../hazzahex/src/app/experiments/ ./

# Show the current git status
git status

# Create and switch to a new branch
git checkout -b "$BRANCH_NAME"

# Add changes to the staging area
git add .

# Commit the changes
git commit -m "Syncing from hazzahex.co.uk repo"

# Push the branch to the origin remote
git push origin "$BRANCH_NAME"

# Create a pull request
gh pr create \
    --base main \
    --head "$BRANCH_NAME" \
    --title "Sync - from private website repo" \
    --body "Automated Sync"