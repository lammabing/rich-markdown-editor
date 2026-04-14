import { useState, useEffect } from 'react';

export function DebugOverlay() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Override console.log temporarily to capture logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const captureLog = (type: string, args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setLogs(prev => [...prev.slice(-50), `[${type}] ${message}`]);
      originalLog.apply(console, args);
    };

    console.log = (...args) => captureLog('LOG', args);
    console.error = (...args) => captureLog('ERROR', args);
    console.warn = (...args) => captureLog('WARN', args);

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  if (logs.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      maxHeight: '200px',
      overflow: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '11px',
      padding: '10px',
      zIndex: 999999,
      borderTop: '2px solid #0f0',
    }}>
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', paddingBottom: '5px', borderBottom: '1px solid #333', marginBottom: '5px' }}>
        <strong>Debug Console ({logs.length} logs)</strong>
      </div>
      {logs.map((log, i) => (
        <div key={i} style={{ 
          color: log.includes('[ERROR]') ? '#f44' : log.includes('[WARN]') ? '#fa0' : '#0f0',
          marginBottom: '2px',
          wordBreak: 'break-word',
        }}>
          {log}
        </div>
      ))}
    </div>
  );
}
