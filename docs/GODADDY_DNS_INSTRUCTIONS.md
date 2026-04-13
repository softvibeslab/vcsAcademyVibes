# GoDaddy DNS Update Instructions for salesmastersminds.com

## Current Domain Status

**Domain:** salesmastersminds.com
**Registrar:** GoDaddy.com, LLC
**Current Nameservers:**
- ARTEMIS.DNS-PARKING.COM
- HERMES.DNS-PARKING.COM
**Current IP:** 2.57.91.91 (DNS Parking service)
**Target IP:** 31.220.63.211 (Your VPS)

## You Have TWO Options:

### Option A: Use GoDaddy's DNS (Recommended - Easier)

This option keeps GoDaddy as your DNS provider but updates the records.

#### Step 1: Log in to GoDaddy
1. Go to https://godaddy.com
2. Log in to your account

#### Step 2: Find Your Domain
1. Click on "My Products" at the top
2. Find "salesmastersminds.com" in the list
3. Click the "DNS" button next to it (or "Manage DNS")

#### Step 3: Update DNS Records

**Delete any existing records that conflict:**

1. Look for any existing A records for "@" (or salesmastersminds.com)
2. Click the trash icon/delete button to remove them
3. Look for any CNAME records for "@" and delete them too

**Add new A records:**

**Record 1 - Root Domain:**
1. Click "Add" or "Add New Record"
2. Select Type: **A**
3. Host/Name: **@** (or leave blank)
4. Points to: **31.220.63.211**
5. TTL: **1 hour** (or 3600)
6. Click "Save" or "Add Record"

**Record 2 - WWW Subdomain:**
1. Click "Add" or "Add New Record" again
2. Select Type: **A**
3. Host/Name: **www**
4. Points to: **31.220.63.211**
5. TTL: **1 hour** (or 3600)
6. Click "Save" or "Add Record"

**Your final DNS records should look like:**
```
Type  Name           Value              TTL
A     @              31.220.63.211      1 hour
A     www            31.220.63.211      1 hour
```

#### Step 4: Wait for Propagation

DNS changes can take anywhere from 5 minutes to 24 hours to propagate worldwide.

#### Step 5: Verify DNS Has Propagated

Run the verification script on the VPS:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
./dns-verify.sh
```

Or check online at: https://dnschecker.org/#A/salesmastersminds.com

#### Step 6: Complete Deployment

Once DNS shows the correct IP (31.220.63.211), run:

```bash
cd /rogervibes/vcs/Vcsa-/apps/vcsavibes
sudo ./deploy-vps.sh
```

---

### Option B: Use Custom Nameservers (Advanced)

This option if you want to use a different DNS provider (like Cloudflare, Route53, etc.).

#### Step 1: Change Nameservers in GoDaddy

1. Log in to GoDaddy
2. Go to "My Products" → "Domain Manager"
3. Find salesmastersminds.com
4. Click "Manage" or "DNS"
5. Click "Change Nameservers"
6. Select "I'll use my own nameservers"
7. Enter your custom nameservers (e.g., from Cloudflare)
8. Click "Save"

#### Step 2: Configure DNS at New Provider

Add the same A records mentioned above at your new DNS provider.

---

## Important Notes

⚠️ **Currently, your domain is using DNS-Parking.com**
This is a parking service. You need to either:
1. Switch to GoDaddy's DNS (Option A - recommended)
2. Or switch to another DNS provider (Option B)

**If you see "DNS Management" disabled in GoDaddy:**
It means your nameservers are pointed elsewhere. You need to either:
- Change nameservers back to GoDaddy's default nameservers
- Or manage DNS at wherever your nameservers are currently pointed

## Troubleshooting

### Can't find DNS Management in GoDaddy?

1. Your nameservers might be pointed to another service
2. Look for "Nameservers" section
3. If using third-party nameservers, manage DNS there

### DNS not updating after changes?

1. **Wait:** DNS can take 1-24 hours to propagate
2. **Clear cache:** Flush your local DNS cache
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-certs`

### Check current nameservers:

```bash
whois salesmastersminds.com | grep "Name Server"
```

## Visual Guide

**GoDaddy DNS Management Page:**

```
┌─────────────────────────────────────────────────────┐
│  GoDaddy - DNS Management                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  salesmastersminds.com                              │
│                                                     │
│  [Add New Record]                                   │
│                                                     │
│  Type    Name    Value              TTL             │
│  ──────  ──────  ─────────────────  ──────         │
│  A       @       31.220.63.211       1 hour  [Edit] │
│  A       www     31.220.63.211       1 hour  [Edit] │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Next Steps After DNS Update

1. ✅ Update DNS records in GoDaddy (Option A)
2. ⏳ Wait 5-60 minutes for initial propagation
3. ⏳ Run: `./dns-verify.sh`
4. ⏳ When verified, run: `sudo ./deploy-vps.sh`
5. 🎉 Visit: https://salesmastersminds.com

---

Need help? Check the full guide at: `docs/DNS_UPDATE_GUIDE.md`
