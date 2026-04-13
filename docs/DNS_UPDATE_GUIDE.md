# DNS Update Guide for salesmastersminds.com

## Server Information

**VPS Public IP:** 31.220.63.211

## Required DNS Records

### Record 1: Root Domain
```
Type: A
Name: @ (or salesmastersminds.com)
Value: 31.220.63.211
TTL: 3600 (or 1 hour)
```

### Record 2: WWW Subdomain
```
Type: A
Name: www
Value: 31.220.63.211
TTL: 3600 (or 1 hour)
```

## How to Update DNS

### Option 1: If domain is registered with common registrars

#### GoDaddy
1. Log in to your GoDaddy account
2. Go to "My Products" → "DNS Management"
3. Find salesmastersminds.com and click "DNS"
4. Edit/add A records:
   - @ → 31.220.63.211
   - www → 31.220.63.211
5. Save changes

#### Namecheap
1. Log in to your Namecheap account
2. Go to "Domain List" → "Manage" next to salesmastersminds.com
3. Go to "Advanced DNS" tab
4. Add/Update A records:
   - Type: A, Host: @, Value: 31.220.63.211
   - Type: A, Host: www, Value: 31.220.63.211
5. Save changes

#### Cloudflare
1. Log in to Cloudflare
2. Select salesmastersminds.com
3. Go to "DNS" → "Records"
4. Add/Edit A records:
   - Type: A, Name: @, IPv4: 31.220.63.211, Proxy: OFF (DNS only)
   - Type: A, Name: www, IPv4: 31.220.63.211, Proxy: OFF (DNS only)
5. Save

#### Google Domains
1. Log in to Google Domains
2. Select salesmastersminds.com
3. Go to "DNS" → "Custom resource records"
4. Add/update A records:
   - @ → A → 31.220.63.211 → 3600
   - www → A → 31.220.63.211 → 3600
5. Save

### Option 2: If using a hosting provider's DNS

1. Log in to your hosting control panel (cPanel, Plesk, etc.)
2. Find "DNS Editor" or "Zone Editor"
3. Add/update A records as shown above
4. Save changes

### Option 3: If using a dedicated DNS service (Route53, etc.)

1. Log in to your DNS provider
2. Find the hosted zone for salesmastersminds.com
3. Create/update A records:
   ```
   Record 1:
     Type: A
     Name: (blank or @)
     Value: 31.220.63.211

   Record 2:
     Type: A
     Name: www
     Value: 31.220.63.211
   ```

## After Updating DNS

### 1. Verify DNS Propagation

Run these commands to check when DNS has propagated:

```bash
# Check from the server
dig salesmastersminds.com
nslookup salesmastersminds.com

# Check from online tools
# Visit: https://dnschecker.org/#A/salesmastersminds.com
# Enter: salesmastersminds.com
# Select: A record
```

### 2. Complete SSL Setup

Once DNS is propagated (can take 1-24 hours), run:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
sudo ./deploy-vps.sh
```

This will:
- Configure SSL certificates
- Update nginx configuration
- Complete the deployment

### 3. Verify the Site

After DNS propagation, check:

```bash
# Check HTTP
curl -I http://salesmastersminds.com

# Check HTTPS (after SSL setup)
curl -I https://salesmastersminds.com

# Check in browser
# Visit: https://salesmastersminds.com
```

## DNS Propagation Timeline

| Time | Propagation | Action |
|------|-------------|--------|
| 0 min | 0% | DNS updated |
| 5 min | ~50% | Some providers updated |
| 30 min | ~80% | Most providers updated |
| 1 hour | ~90% | Almost complete |
| 24 hours | 100% | Fully propagated |

## Troubleshooting

### DNS not updating?

1. **Clear your local DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns

   # macOS
   sudo dscacheutil -flushcache

   # Linux
   sudo systemd-resolve --flush-certs
   ```

2. **Check from different sources:**
   - Use your phone's mobile data (different ISP)
   - Use online tools: dnschecker.org, whatsmydns.net

3. **Verify records are correct:**
   - Double-check the IP: 31.220.63.211
   - Make sure there's only ONE A record for @
   - Remove any conflicting CNAME records

### SSL certificate failing?

If SSL setup fails after DNS propagation:

```bash
# Check nginx is running
systemctl status nginx

# Test DNS resolution
dig salesmastersminds.com +short

# Try manual SSL certificate
certbot certonly --nginx -d salesmastersminds.com -d www.salesmastersminds.com
```

## Current Configuration

**Target Domain:** salesmastersminds.com
**Target IP:** 31.220.63.211
**Frontend Port:** 3002
**Backend API:** VCSA (localhost:8000)

**Nginx Configuration:** ✅ Created at /etc/nginx/sites-available/salesmastersminds.com
**PM2 Process:** ✅ Running (vcsavibes)
**Application:** ✅ Active on port 3002

## Next Steps

1. ✅ Update DNS records (your action)
2. ⏳ Wait for DNS propagation (1-24 hours)
3. ⏳ Run: `sudo ./deploy-vps.sh`
4. ⏳ Verify site: https://salesmastersminds.com

---

*Last Updated: April 13, 2026*
