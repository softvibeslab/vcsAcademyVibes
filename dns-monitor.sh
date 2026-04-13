#!/bin/bash

# DNS Monitor Script
# Monitors DNS propagation every 30 seconds

DOMAIN="salesmastersminds.com"
TARGET_IP="31.220.63.211"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  DNS Monitor for $DOMAIN"
echo "=========================================="
echo "Monitoring for IP change to: $TARGET_IP"
echo "Press Ctrl+C to stop"
echo ""

while true; do
    CURRENT_IP=$(dig +short $DOMAIN A | head -1)

    if [ "$CURRENT_IP" = "$TARGET_IP" ]; then
        echo -e "$(date '+%H:%M:%S') ${GREEN}✓ DNS UPDATED!${NC} IP: $CURRENT_IP"
        echo ""
        echo "DNS has been updated! You can now run:"
        echo "  cd /rogervibes/vcs/Vcsa-/apps/vcsavibes"
        echo "  sudo ./deploy-vps.sh"
        echo ""
        break
    else
        echo -e "$(date '+%H:%M:%S') ${RED}✗${NC} Waiting... Current IP: $CURRENT_IP"
    fi

    sleep 30
done

echo "=========================================="
echo "  DNS Propagation Complete!"
echo "=========================================="
