# VCSAVibes VPS Deployment Guide

## Overview

This guide covers deploying VCSAVibes to production on a VPS with the domain **salesmastersminds.com**.

## Infrastructure

| Component | Details |
|-----------|---------|
| **Domain** | salesmastersminds.com |
| **Frontend Port** | 3002 |
| **Backend API** | https://api.vcsacm.com |
| **Process Manager** | PM2 |
| **Web Server** | Nginx |
| **SSL** | Let's Encrypt |

## Prerequisites

```bash
# System requirements
- Ubuntu 20.04+ / Debian 11+
- Node.js 18+
- Nginx
- PM2
- Certbot (for SSL)
```

## Quick Deploy

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
chmod +x deploy-vps.sh
sudo ./deploy-vps.sh
```

## Manual Deployment Steps

### 1. Build the Application

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes

# Install dependencies
npm install

# Build for production
npm run build
```

### 2. Start with PM2

```bash
# Start application
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup systemd
```

### 3. Configure Nginx

Create `/etc/nginx/sites-available/salesmastersminds.com`:

```nginx
server {
    listen 80;
    server_name salesmastersminds.com www.salesmastersminds.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name salesmastersminds.com www.salesmastersminds.com;

    ssl_certificate /etc/letsencrypt/live/salesmastersminds.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/salesmastersminds.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass https://api.vcsacm.com;
        proxy_set_header Host api.vcsacm.com;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/salesmastersminds.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Setup SSL Certificate

```bash
# Stop nginx temporarily
sudo systemctl stop nginx

# Get certificate
sudo certbot certonly --standalone \
  -d salesmastersminds.com \
  -d www.salesmastersminds.com \
  --email admin@softvibeslab.com \
  --agree-tos

# Start nginx
sudo systemctl start nginx
```

### 5. Setup Auto-Renewal

```bash
# Add to crontab
(crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet && systemctl reload nginx") | crontab -
```

## Management Commands

```bash
# PM2 Management
pm2 logs vcsavibes          # View logs
pm2 restart vcsavibes       # Restart app
pm2 stop vcsavibes          # Stop app
pm2 status                  # Check status
pm2 monit                   # Monitor resources

# Nginx Management
sudo systemctl reload nginx        # Reload nginx
sudo systemctl status nginx        # Check nginx status
sudo nginx -t                      # Test configuration

# SSL Management
sudo certbot renew                 # Renew certificates
sudo certbot certificates          # List certificates
```

## Monitoring

### Application Logs

```bash
# PM2 logs
pm2 logs vcsavibes

# System logs
tail -f /var/log/vcsavibes-out.log
tail -f /var/log/vcsavibes-error.log
```

### Health Checks

```bash
# Check if app is running
pm2 status

# Check port
netstat -tlnp | grep 3002

# Check nginx
curl -I https://salesmastersminds.com
```

## Rollback

If you need to rollback:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
chmod +x rollback-vps.sh
sudo ./rollback-vps.sh
```

## Environment Variables

Production environment is configured in `.env.production`:

```env
VITE_API_URL=https://api.vcsacm.com
VITE_APP_NAME=VCSAVibes
VITE_APP_URL=https://salesmastersminds.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_GAMIFICATION=true
VITE_ENABLE_COACHING=true
```

## Troubleshooting

### App not starting

```bash
# Check PM2 logs
pm2 logs vcsavibes --lines 100

# Check if port is in use
lsof -i :3002

# Restart PM2
pm2 restart vcsavibes
```

### Nginx 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Force renew
sudo certbot renew --force-renewal

# Reload nginx
sudo systemctl reload nginx
```

## Security

- ✅ HTTPS enforced with SSL
- ✅ Security headers configured
- ✅ CORS enabled for API
- ✅ Rate limiting via nginx
- ✅ Automatic SSL renewal

## Performance

- ✅ Gzip compression enabled
- ✅ Static file caching
- ✅ Code splitting configured
- ✅ Lazy loading enabled

## Backup

No database backup needed (VCSAVibes uses VCSA backend). To backup the frontend:

```bash
# Create backup
tar -czf vcsavibes-backup-$(date +%Y%m%d).tar.gz /rogervibes/vcs/Vcsa-/apps/vcsavibes

# Restore
tar -xzf vcsavibes-backup-YYYYMMDD.tar.gz
```

## Updates

To update the application:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes

# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart vcsavibes
```

---

*Last Updated: April 12, 2026*
