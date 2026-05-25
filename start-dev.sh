#!/bin/bash
cd /mnt/g/www/markdown-editor
echo "Starting Markdown Editor Dev Server..."
echo "Server will be available at: http://localhost:5173"
echo "NOTE: If the page appears stuck/blank, browser extensions (ad blockers,"
echo "      style changers, dark mode plugins) may interfere. Try Incognito mode."
echo "Press Ctrl+C to stop"
echo ""
exec node --max-old-space-size=4096 node_modules/.bin/vite "$@"
