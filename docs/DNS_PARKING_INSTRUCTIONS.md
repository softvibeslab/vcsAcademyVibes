# DNS-Parking.com Configuration Guide for salesmastersminds.com

## Current Status

**Domain:** salesmastersminds.com
**Nameservers:**
- hermes.dns-parking.com
- artemis.dns-parking.com
**Current IP:** 2.57.91.91 (Parking service)
**Target IP:** 31.220.63.211 (Your VPS)

## How to Update DNS in DNS-Parking.com

### Option 1: Access DNS-Parking.com Control Panel

#### Step 1: Access Your Account
1. Go to: https://dns-parking.com
2. Log in with your account credentials
3. Find "salesmastersminds.com" in your domain list

#### Step 2: Manage DNS Records
1. Click on "Manage" or "DNS" next to salesmastersminds.com
2. Look for "DNS Records" or "Zone Editor" or "Advanced DNS"

#### Step 3: Update/Add A Records

**Delete existing A records:**
- Find any existing A records
- Delete them (especially ones pointing to 2.57.91.91)

**Add new A records:**

**Record 1 - Root Domain:**
```
Type: A
Name: @ (or leave blank)
IP Address/Value: 31.220.63.211
TTL: 3600 (or 1 hour)
```

**Record 2 - WWW Subdomain:**
```
Type: A
Name: www
IP Address/Value: 31.220.63.211
TTL: 3600 (or 1 hour)
```

**Your DNS should look like:**
```
Type  Name    Value              TTL
A     @       31.220.63.211       3600
A     www     31.220.63.211       3600
```

#### Step 4: Save Changes
- Click "Save" or "Apply Changes"
- Wait for propagation (5-60 minutes)

---

### Option 2: Contact DNS-Parking.com Support

If you cannot access the DNS management panel:

1. **Email:** support@dns-parking.com
2. **Subject:** DNS Update Request for salesmastersminds.com

**Email Template:**
```
Hello,

I need to update the DNS records for my domain: salesmastersminds.com

Please update the following A records:

Record 1:
- Type: A
- Name: @
- Value: 31.220.63.211

Record 2:
- Type: A
- Name: www
- Value: 31.220.63.211

Please remove any existing A records that point to 2.57.91.91.

Thank you,
[Your Name]
[Your Account Details]
```

---

### Option 3: Use GoDaddy to Change Nameservers (Alternative)

If DNS-Parking.com is difficult to manage, you can switch back to GoDaddy's DNS:

#### Step 1: Log in to GoDaddy
1. Go to https://godaddy.com
2. Log in to your account

#### Step 2: Change Nameservers
1. Go to "My Products" → "Domain Manager"
2. Find "salesmastersminds.com"
3. Click "Manage" → "DNS"
4. Click "Change Nameservers"
5. Select: "I'll use my own nameservers" OR use GoDaddy's default nameservers

**If switching to GoDaddy's nameservers:**
```
NS1: ns35.domaincontrol.com
NS2: ns36.domaincontrol.com
```

6. Click "Save"

#### Step 3: Configure DNS in GoDaddy
1. Once nameservers are updated (may take 1-24 hours)
2. Go back to "DNS Management" in GoDaddy
3. Add the A records as shown in Option 1

---

## Verification After Updates

### Wait for Propagation
DNS changes can take:
- **5-30 minutes:** Quick update
- **1-6 hours:** Typical propagation
- **24-48 hours:** Full global propagation

### Run Verification Script
```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
./dns-verify.sh
```

### Check Online
- https://dnschecker.org/#A/salesmastersminds.com
- https://whatsmydns.net/#A/salesmastersminds.com

### When DNS is Correct
Once the verification shows **31.220.63.211**, run:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
sudo ./deploy-vps.sh
```

This will complete the SSL setup and final deployment.

---

## Troubleshooting

### DNS not updating?

**Check if you updated the right records:**
- You need A records, not CNAME
- Name should be "@" and "www"
- Value should be "31.220.63.211"

**Still showing 2.57.91.91?**
- DNS Parking may have forwarding enabled
- Check for "URL Forwarding" or "Redirect" settings
- Disable any forwarding/redirection

### Can't access DNS-Parking.com panel?

**Common issues:**
1. Account not linked to GoDaddy
2. Separate login required
3. Need to contact support

**Solutions:**
- Reset password on DNS-Parking.com
- Contact GoDaddy support for access
- Switch to GoDaddy's DNS (Option 3)

### Nameserver not updating?

**If you changed nameservers but still show DNS-Parking:**
- Wait 24-48 hours for nameserver changes
- Verify nameserver changes at: https://who.is/dns/salesmastersminds.com
- Contact GoDaddy support if stuck

---

## Current DNS Status Check

```bash
# Check current DNS
dig salesmastersminds.com +short

# Check nameservers
whois salesmastersminds.com | grep "Name Server"

# Full DNS lookup
dig salesmastersminds.com ANY
```

---

## Quick Reference

**Target Configuration:**
```
Domain: salesmastersminds.com
Root A Record: @ → 31.220.63.211
WWW A Record: www → 31.220.63.211
```

**Verification Commands:**
```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
./dns-verify.sh
```

**Final Deployment:**
```bash
sudo ./deploy-vps.sh
```

---

*Last Updated: April 13, 2026*
