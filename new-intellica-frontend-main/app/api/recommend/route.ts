import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required" },
      { status: 400 }
    );
  }

  try {
    const mlResponse = await fetch(
      `http://127.0.0.1:8000/api/recommend?topic=${encodeURIComponent(topic)}`
    );

    if (!mlResponse.ok) {
      return NextResponse.json(
        { error: "ML service error" },
        { status: 502 }
      );
    }

    const data = await mlResponse.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "ML service unavailable" },
      { status: 503 }
    );
  }
}
