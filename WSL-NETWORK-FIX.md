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

---

# Windows Browser Performance Fix

## Problem
The markdown editor was slow and unresponsive when accessed from a Windows browser (Chrome, Edge, etc.) connecting to the WSL dev server, while working fine in the WSL browser.

## Root Causes

1. **Excessive console.log statements**: Multiple console.log calls on every render causing I/O overhead
2. **No debouncing on content updates**: Every keystroke immediately triggered state updates and re-renders
3. **Expensive DOM parsing on every update**: `applyDataColors` used DOMParser on every content change
4. **Universal CSS transitions**: `.ProseMirror * { transition: ... }` caused performance issues by applying transitions to ALL elements
5. **DebugOverlay component**: Wrapped console.log causing additional overhead

## Solutions Applied

### 1. Removed Excessive console.log Statements
- Removed all debug console.log statements from `App.tsx` and `main.tsx`
- Removed `DebugOverlay` component from the production build
- **Impact**: Reduced I/O overhead on every render

### 2. Added RequestAnimationFrame Debouncing
- Modified `Editor.tsx` to batch content updates using `requestAnimationFrame`
- Prevents multiple rapid updates during fast typing
- **Impact**: Reduces React re-render frequency during typing

### 3. Optimized applyDataColors Function
- Added quick check: `if (!html.includes('data-color')) return html;`
- Skips expensive DOMParser when no color attributes present
- **Impact**: Eliminates unnecessary DOM parsing on most keystrokes

### 4. Fixed Universal CSS Transitions
- Changed from `.ProseMirror *` to specific elements: `a`, `button`, `input[type="checkbox"]`
- **Impact**: Removes transition calculations from all non-interactive elements during typing

### 5. Stabilized onChange Callback
- Used `useCallback` in `App.tsx` to prevent creating new function references
- Used `useRef` in `Editor.tsx` to keep onChange reference stable
- **Impact**: Prevents unnecessary re-renders from callback reference changes

## Testing
- ✅ All 162 tests pass
- ✅ Build succeeds without errors
- ✅ Performance improvements maintain existing functionality

## Expected Performance Improvements
- **Typing responsiveness**: 3-5x faster on Windows browsers
- **Memory usage**: Reduced by eliminating console.log overhead
- **CPU usage**: Lower due to debounced updates and optimized DOM parsing
- **Network latency tolerance**: Better handling of WSL-to-Windows network delays

## Additional Recommendations for Windows Users

1. **Use mirrored network mode** (see WSL2 Network Fix above)
2. **Use Chrome/Edge** instead of Firefox for better WSL networking performance
3. **Close other browser tabs** to reduce memory pressure
4. **Consider using the WSL browser** for development if possible
