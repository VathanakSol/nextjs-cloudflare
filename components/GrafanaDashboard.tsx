"use client";

import { useEffect, useState } from "react";

export default function GrafanaEmbed() {
  const [dashboardUrl, setDashboardUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dashboardId = `fb35ce21-febc-427c-9a25-897a1bd1ea01`

  useEffect(() => {
    const fetchGrafanaDashboard = async () => {
      try {
        setIsLoading(true);

        // Then use the proxy route to get the embeddable content
        const proxyUrl = `/api/grafana-url?dashboardId=${dashboardId}`;
        const proxyRes = await fetch(proxyUrl);

        if (!proxyRes.ok) throw new Error("Failed to load dashboard via proxy");

        // Use the proxy URL for the iframe
        const embedUrl = new URL(proxyUrl, window.location.origin);
        embedUrl.searchParams.append("kiosk", "");
        embedUrl.searchParams.append("embed", "true");

        setDashboardUrl(embedUrl.toString());
        setError("");
      } catch (error) {
        console.error("Dashboard loading error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load dashboard"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrafanaDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Grafana dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-medium text-red-800">Dashboard Error</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <iframe
        src={dashboardUrl}
        width="100%"
        height="100%"
        allow="fullscreen"
        title="Grafana Dashboard"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        className="border-0"
        onError={() => setError("Failed to load dashboard content")}
      />
    </div>
  );
}
