#!/bin/bash

# VCSAVibes Deployment Script
# This script deploys VCSAVibes to production on the VPS

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Deploying VCSAVibes to Production..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# 1. Stop existing container if running
echo -e "${YELLOW}📦 Stopping existing container...${NC}"
cd "$PROJECT_DIR"
docker-compose down 2>/dev/null || true

# 2. Build new image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
docker-compose build --no-cache

# 3. Start container
echo -e "${YELLOW}🚀 Starting container...${NC}"
docker-compose up -d

# 4. Wait for health check
echo -e "${YELLOW}⏳ Waiting for container to be healthy...${NC}"
sleep 10

# 5. Check container status
if docker ps | grep -q vcsavibes-frontend; then
    echo -e "${GREEN}✅ Container is running!${NC}"
else
    echo -e "${RED}❌ Container failed to start!${NC}"
    docker-compose logs
    exit 1
fi

# 6. Setup nginx configuration
echo -e "${YELLOW}📝 Configuring nginx...${NC}"
cp "$SCRIPT_DIR/deploy/nginx-vcsavibes.conf" /etc/nginx/sites-available/vcsavibes.softvibeslab.com
ln -sf /etc/nginx/sites-available/vcsavibes.softvibeslab.com /etc/nginx/sites-enabled/

# 7. Test nginx configuration
echo -e "${YELLOW}🧪 Testing nginx configuration...${NC}"
if nginx -t; then
    echo -e "${GREEN}✅ nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ nginx configuration error!${NC}"
    exit 1
fi

# 8. Reload nginx
echo -e "${YELLOW}🔄 Reloading nginx...${NC}"
systemctl reload nginx
echo -e "${GREEN}✅ nginx reloaded${NC}"

# 9. Health check
echo -e "${YELLOW}🏥 Checking health endpoint...${NC}"
if curl -f http://localhost:3003/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Health check failed (may still be starting up)...${NC}"
fi

# 10. Display deployment info
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ VCSAVibes deployed successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo "📍 Application URLs:"
echo "   HTTP:  http://vcsavibes.softvibeslab.com"
echo "   HTTP:  http://vibes.vcsa.softvibeslab.com"
echo "   Local: http://localhost:3003"
echo ""
echo "🔧 Management commands:"
echo "   Logs:   docker logs -f vcsavibes-frontend"
echo "   Stop:   cd $PROJECT_DIR && docker-compose down"
echo "   Start:  cd $PROJECT_DIR && docker-compose up -d"
echo "   Restart: docker restart vcsavibes-frontend"
echo ""
echo "📊 Container status:"
docker ps --filter name=vcsavibes-frontend --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "🌐 Next steps:"
echo "   1. Configure DNS records:"
echo "      - vcsavibes.softvibeslab.com → 31.220.63.211"
echo "      - vibes.vcsa.softvibeslab.com → 31.220.63.211"
echo "   2. Setup SSL with Let's Encrypt:"
echo "      certbot --nginx -d vcsavibes.softvibeslab.com"
echo "   3. Test the application at the configured URLs"
echo ""
