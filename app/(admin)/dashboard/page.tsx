import MetricCardSkeleton from '@/components/MetricCardSkeleton';
import React, { Suspense } from 'react';
import Image from 'next/image';

export default function MetricsDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex items-center justify-center gap-4">
            <Image
                src="https://api.iconify.design/vscode-icons:file-type-prometheus.svg"
                alt="Logo"
                width={100}
                height={100}
            />
            <h1 className="text-3xl font-bold text-center text-orange-500">Application Metrics Dashboard - Prometheus</h1>
        </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <MetricsContent />
      </Suspense>
    </div>
  );
}

async function MetricsContent() {
  // Fetch metrics from your API endpoint
  const res = await fetch('http://localhost:3000/api/metrics');
  const metrics = await res.text();

  // Parse metrics into a more readable format
//   const parsedMetrics = metrics.split('\n').filter(line => line && !line.startsWith('#'));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🖥️ System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parseMetricCards(metrics)}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">⚡Raw Metrics</h2>
        <div className="bg-gray-50 p-4 rounded overflow-x-auto h-[40vh]">
          <pre className="text-sm font-mono overflow-y-auto">{metrics}</pre>
        </div>
      </div>
    </div>
  );
}

function parseMetricCards(metrics: string) {
  // Extract important metrics
  const cpuUsage = metrics.match(/process_cpu_user_seconds_total (\d+\.\d+)/);
  const memoryUsage = metrics.match(/process_resident_memory_bytes (\d+)/);
  const httpRequests = metrics.match(/http_requests_total (\d+)/);

  return (
    <>
      <MetricCard 
        title="CPU Usage" 
        value={cpuUsage ? parseFloat(cpuUsage[1]).toFixed(2) + 's' : 'N/A'}
        trend="up"
      />
      <MetricCard 
        title="Memory Usage" 
        value={memoryUsage ? (parseInt(memoryUsage[1]) / 1024 / 1024 + 'MB'): 'N/A'}
        trend="neutral"
      />
      <MetricCard 
        title="HTTP Requests" 
        value={httpRequests ? httpRequests[1] : '0'}
        trend="up"
      />
    </>
  );
}

function MetricCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="ml-2 text-gray-500">{trendIcons[trend as keyof typeof trendIcons]}</span>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Raw Metrics</h2>
        <div className="bg-gray-200 h-64 rounded animate-pulse"></div>
      </div>
    </div>
  );
}