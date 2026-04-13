#!/bin/bash

# VCSAVibes VPS Rollback Script
# Use this script to rollback the deployment

set -e

DOMAIN="salesmastersminds.com"
APP_DIR="/rogervibes/vcs/Vcsa-/apps/vcsavibes"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  VCSAVibes VPS Rollback"
echo "=========================================="

echo -e "${YELLOW}Stopping PM2 process...${NC}"
pm2 stop vcsavibes
pm2 delete vcsavibes

echo -e "${GREEN}✓ PM2 process stopped${NC}"

echo -e "${YELLOW}Removing Nginx configuration...${NC}"
rm -f /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-available/$DOMAIN

systemctl reload nginx

echo -e "${GREEN}✓ Nginx configuration removed${NC}"

echo ""
echo -e "${GREEN}Rollback completed${NC}"
echo "The application has been stopped and nginx configuration removed."
