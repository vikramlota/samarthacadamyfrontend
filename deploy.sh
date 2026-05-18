#!/bin/bash
set -e

echo "===================================================="
echo "🚀 Starting Samarth Academy Frontend Deployment..."
echo "===================================================="

# Ensure we are in the correct directory
cd /root/samarthacadamyfrontend

echo "📦 1/6: Cleaning untracked build files and pulling latest code..."
git clean -fd
git fetch origin
git reset --hard origin/main
git pull origin main

echo "🔨 2/6: Installing dependencies (if any changed)..."
npm install

echo "🏗️ 3/6: Building public site and admin panel..."
npm run build:all

echo "📂 4/6: Deploying builds to Nginx web root (/var/www/dist)..."
sudo rm -rf /var/www/dist
sudo cp -r dist /var/www/dist
sudo cp -r dist-admin /var/www/dist/admin

echo "⚙️ 5/6: Verifying Nginx configuration..."
sudo nginx -t

echo "🔄 6/6: Restarting Nginx service..."
sudo systemctl restart nginx

echo "===================================================="
echo "✅ Deployment Complete! Live website is fully updated."
echo "===================================================="
