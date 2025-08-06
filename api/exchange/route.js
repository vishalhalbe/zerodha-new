
import { NextResponse } from 'next/server';
import { KiteConnect } from 'kiteconnect';

export async function POST(request) {
  try {
    const body = await request.json();
    const { api_key, request_token, checksum } = body;

    const kc = new KiteConnect({ api_key });
    const session = await kc.generateSession(request_token, checksum);

    return NextResponse.json({ status: "success", data: session });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message || err.toString() });
  }
}
