import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dashboardId = searchParams.get('dashboardId');
  
  try {
    const grafanaUrl = `${process.env.GRAFANA_URL}/d/${dashboardId}?kiosk&embed=true`;
    const res = await fetch(grafanaUrl);
    const html = await res.text();
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch Grafana dashboard' },
      { status: 500 }
    );
  }
}