import { NextResponse } from "next/server";

export async function GET(){
    
    const data = {
        message: 'Hello from the Cloudinator Workers API',
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(data, {
        headers: {
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        }
    })
}