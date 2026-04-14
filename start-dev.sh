#!/bin/bash
cd /mnt/g/www/markdown-editor
echo "Starting Markdown Editor Dev Server..."
echo "Server will be available at: http://localhost:5173"
echo "Press Ctrl+C to stop"
echo ""
exec node --max-old-space-size=4096 node_modules/.bin/vite "$@"
