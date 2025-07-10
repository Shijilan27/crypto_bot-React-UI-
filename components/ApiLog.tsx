
import React from 'react';
import { ApiLogEntry, LogType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ScrollArea } from './ui/ScrollArea';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface ApiLogProps {
  logs: ApiLogEntry[];
}

const logTypeConfig = {
  [LogType.REQUEST]: {
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400',
    bgColor: 'bg-cyan-900/30',
    Icon: ArrowRight,
  },
  [LogType.RESPONSE]: {
    color: 'text-green-400',
    borderColor: 'border-green-400',
    bgColor: 'bg-green-900/30',
    Icon: CheckCircle,
  },
  [LogType.ERROR]: {
    color: 'text-red-400',
    borderColor: 'border-red-400',
    bgColor: 'bg-red-900/30',
    Icon: AlertTriangle,
  },
};
// The full class names are included in the config above so Tailwind's JIT compiler will find them.

const ApiLog: React.FC<ApiLogProps> = ({ logs }) => {
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Auto-scroll to the bottom when new logs are added
    if (scrollableRef.current) {
        scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-900/70 rounded-md font-mono text-xs overflow-hidden">
            <ScrollArea className="h-full p-2" ref={scrollableRef}>
            {logs.length === 0 && <div className="text-gray-500 text-center h-full flex items-center justify-center">No API activity yet.</div>}
            {logs.map((log) => {
                const config = logTypeConfig[log.type];
                return (
                <div key={log.id} className={`p-2 mb-2 last:mb-0 rounded ${config.bgColor} border-l-4 ${config.borderColor}`}>
                    <div className={`flex items-center justify-between font-bold ${config.color}`}>
                    <div className="flex items-center gap-2">
                        <config.Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{log.type.toUpperCase()} - {log.method}</span>
                    </div>
                    <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-gray-400 mt-1 break-all" aria-label="API Endpoint">{log.endpoint}</div>
                    <pre className="mt-2 p-2 bg-black/30 rounded text-gray-300 whitespace-pre-wrap break-all text-[11px] leading-snug" aria-label="Log Data">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                </div>
                );
            })}
            </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiLog;
