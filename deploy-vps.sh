#!/bin/bash

# VCSAVibes VPS Deployment Script
# Domain: salesmastersminds.com
# Port: 3002

set -e

echo "=========================================="
echo "  VCSAVibes VPS Deployment"
echo "=========================================="

DOMAIN="salesmastersminds.com"
APP_DIR="/rogervibes/vcs/Vcsa-/apps/vcsavibes"
PORT=3002
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 1: Building VCSAVibes for production...${NC}"
cd $APP_DIR

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the application
echo "Building production bundle..."
npm run build

echo -e "${GREEN}✓ Build completed${NC}"

echo -e "${YELLOW}Step 2: Setting up PM2...${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  npm install -g pm2
fi

# Stop existing process if running
pm2 stop vcsavibes 2>/dev/null || true
pm2 delete vcsavibes 2>/dev/null || true

# Start with PM2
echo "Starting VCSAVibes with PM2..."
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u root --hp /root

echo -e "${GREEN}✓ PM2 configured${NC}"

echo -e "${YELLOW}Step 3: Configuring Nginx...${NC}"

# Create nginx configuration
cat > $NGINX_CONF << EOF
server {
    listen 80;
    listen [::]:80;

    server_name $DOMAIN www.$DOMAIN;

    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Client body size limit
    client_max_body_size 10M;

    # Proxy to VCSAVibes
    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API proxy to VCSA backend
    location /api {
        proxy_pass https://api.vcsacm.com;
        proxy_http_version 1.1;
        proxy_set_header Host api.vcsacm.com;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # CORS headers
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

        if (\$request_method = OPTIONS) {
            return 204;
        }
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:$PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF

# Enable the site
ln -sf $NGINX_CONF $NGINX_ENABLED

echo -e "${GREEN}✓ Nginx configuration created${NC}"

echo -e "${YELLOW}Step 4: Testing Nginx configuration...${NC}"

# Test nginx configuration
nginx -t

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Nginx configuration is valid${NC}"

  # Reload nginx
  systemctl reload nginx
  echo -e "${GREEN}✓ Nginx reloaded${NC}"
else
  echo -e "${RED}✗ Nginx configuration test failed${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 5: Setting up SSL with Let's Encrypt...${NC}"

# Install certbot if not present
if ! command -v certbot &> /dev/null; then
  echo "Installing Certbot..."
  apt update
  apt install -y certbot python3-certbot-nginx
fi

# Stop nginx temporarily to get certificate
systemctl stop nginx

# Get SSL certificate
certbot certonly --standalone \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email admin@softvibeslab.com \
  --agree-tos \
  --non-interactive \
  --redirect

# Start nginx again
systemctl start nginx

echo -e "${GREEN}✓ SSL certificate installed${NC}"

echo -e "${YELLOW}Step 6: Setting up SSL auto-renewal...${NC}"

# Setup certbot auto-renewal
(crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet && systemctl reload nginx") | crontab -

echo -e "${GREEN}✓ SSL auto-renewal configured${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}  ✓ Deployment Completed Successfully!${NC}"
echo "=========================================="
echo ""
echo "Application Details:"
echo "  Domain: https://$DOMAIN"
echo "  Port: $PORT"
echo "  PM2 App: vcsavibes"
echo ""
echo "Useful Commands:"
echo "  pm2 logs vcsavibes          # View logs"
echo "  pm2 restart vcsavibes       # Restart app"
echo "  pm2 status                  # Check status"
echo "  systemctl reload nginx      # Reload nginx"
echo "  certbot renew               # Renew SSL"
echo ""
echo -e "${GREEN}Your VCSAVibes app is now live at: https://$DOMAIN${NC}"
