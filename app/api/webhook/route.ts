import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook Received:", JSON.stringify(body, null, 2));

    // Log the webhook data (for testing)
    // Process webhook events here, e.g., message status, incoming messages, etc.
    return NextResponse.json({ status: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Verify webhook during the setup
  const params = new URL(req.url).searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  const VERIFY_TOKEN = "your_verify_token"; // Replace with your chosen verify token

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully.");
    return new Response(challenge, { status: 200 });
  } else {
    console.error("Webhook verification failed.");
    return new Response(null, { status: 403 });
  }
}
