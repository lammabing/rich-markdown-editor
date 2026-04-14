# WSL2 Network Fix for Windows Browser Access

## Problem
The app is accessible from WSL's browser but not from Windows browsers because WSL2 uses NAT networking by default.

## Solution: Enable Mirrored Network Mode

### Step 1: Update WSL Configuration

Copy the network configuration to the WSL system configuration:

```bash
sudo cp /mnt/g/www/markdown-editor/wsl.conf /etc/wsl.conf
```

Or edit `/etc/wsl.conf` directly and ensure it contains:

```ini
[network]
generateResolvConf = false
networkingMode = mirrored
```

### Step 2: Restart WSL

From **Windows PowerShell** (not WSL):

```powershell
wsl --shutdown
```

Then restart WSL by opening your WSL terminal again.

### Step 3: Verify

After restart, in WSL run:

```bash
npm run dev
```

The app should now be accessible from Windows browsers at:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

## Alternative: Without Mirrored Network Mode

If you cannot change WSL config, use these alternatives:

### Option A: Access via WSL hostname
```
http://host.docker.internal:5173
```
or
```
http://<WSL2-IP>:5173
```
(Find your WSL2 IP with: `ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1`)

### Option B: Port Forwarding (Windows PowerShell as Administrator)
```powershell
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=<WSL2-IP>
```

### Option C: Windows Firewall Rule
The Vite dev server already listens on `0.0.0.0` (`host: true` in vite.config.ts), but Windows Firewall may block it. Add a rule:

```powershell
New-NetFirewallRule -DisplayName "Allow WSL2 Port 5173" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

## Current Configuration

- **WSL2 IP**: 192.168.0.150
- **Vite host**: `true` (listens on 0.0.0.0)
- **Vite port**: 5173
- **Current network mode**: NAT (not mirrored)
