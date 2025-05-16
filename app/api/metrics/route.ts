import { NextResponse, NextRequest } from "next/server";
import { collectDefaultMetrics, Registry, Counter } from "prom-client";

const register = new Registry();
collectDefaultMetrics({register});

const requestCounter = new Counter({
    name: 'http_requests_total',
    help: 'Number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
})

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  requestCounter.inc({method: request.method, route: url.pathname, status_code: 200});  
  
  const metrics = await register.metrics();
  return new NextResponse(metrics, {
    status: 200,
    headers: {
      'Content-Type': register.contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate', // Prevent caching
      'X-Metrics-Version': '1.0',
      'X-Endpoint': 'Prometheus Metrics',
    },
  });
}