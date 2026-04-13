#!/bin/bash

# DNS Verification Script for salesmastersminds.com
# This script checks if DNS has been updated to point to the VPS

DOMAIN="salesmastersminds.com"
TARGET_IP="31.220.63.211"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  DNS Verification for $DOMAIN"
echo "=========================================="
echo ""
echo "Target IP: $TARGET_IP"
echo ""

# Function to check DNS
check_dns() {
    echo -e "${YELLOW}Checking DNS propagation...${NC}"
    echo ""

    # Check with dig
    echo "1. Checking with dig:"
    DIG_RESULT=$(dig +short $DOMAIN A)
    if [ "$DIG_RESULT" = "$TARGET_IP" ]; then
        echo -e "   ${GREEN}✓${NC} DNS is correct: $DIG_RESULT"
    else
        echo -e "   ${RED}✗${NC} DNS is: $DIG_RESULT"
        echo -e "   ${YELLOW}Expected: $TARGET_IP${NC}"
    fi
    echo ""

    # Check with nslookup
    echo "2. Checking with nslookup:"
    NSLOOKUP_RESULT=$(nslookup $DOMAIN | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
    if [ "$NSLOOKUP_RESULT" = "$TARGET_IP" ]; then
        echo -e "   ${GREEN}✓${NC} DNS is correct: $NSLOOKUP_RESULT"
    else
        echo -e "   ${RED}✗${NC} DNS is: $NSLOOKUP_RESULT"
        echo -e "   ${YELLOW}Expected: $TARGET_IP${NC}"
    fi
    echo ""

    # Check from online perspective (using curl ifconfig.me)
    echo "3. Current server IP:"
    CURRENT_IP=$(curl -s ifconfig.me)
    echo "   $CURRENT_IP"
    echo ""

    # Check www subdomain
    echo "4. Checking www.$DOMAIN:"
    WWW_RESULT=$(dig +short www.$DOMAIN A)
    if [ "$WWW_RESULT" = "$TARGET_IP" ]; then
        echo -e "   ${GREEN}✓${NC} WWW DNS is correct: $WWW_RESULT"
    else
        echo -e "   ${RED}✗${NC} WWW DNS is: $WWW_RESULT"
        echo -e "   ${YELLOW}Expected: $TARGET_IP${NC}"
    fi
    echo ""

    # Final verdict
    echo "=========================================="
    if [ "$DIG_RESULT" = "$TARGET_IP" ] && [ "$WWW_RESULT" = "$TARGET_IP" ]; then
        echo -e "${GREEN}✓ DNS is correctly configured!${NC}"
        echo ""
        echo "You can now proceed with SSL setup:"
        echo "  cd /rogervibes/vcs/Vcsa-/apps/vcsavibes"
        echo "  sudo ./deploy-vps.sh"
        return 0
    else
        echo -e "${RED}✗ DNS not yet updated${NC}"
        echo ""
        echo "Please update your DNS records:"
        echo "  Type: A"
        echo "  Name: @"
        echo "  Value: $TARGET_IP"
        echo ""
        echo "  Type: A"
        echo "  Name: www"
        echo "  Value: $TARGET_IP"
        echo ""
        echo "Then run this script again to verify."
        return 1
    fi
}

# Run check
check_dns

echo ""
echo "For more information, see: docs/DNS_UPDATE_GUIDE.md"
echo "=========================================="
