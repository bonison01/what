import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_API_URL = "https://graph.facebook.com/v21.0/567396246447052/messages";
const ACCESS_TOKEN = "EAAGeDf9xIzYBOxZB0I5VTrA4DofvL1Fos9oHtGBSZCGeqifD9ZCOBozzyXp1wuhRBCRIsDHWTtCSLvUoQdmE5JrZAWap3xEUb5ZAgQy6hDXJ4wCzps4ZBd5mSHFkZC1Lbwx91r3Vci7gjZAPMFSg5hkrpsOXK0B9h3GZCJssVVcLwNV31TyAoa67ZAJQH29dlQJCsZARMfrqUwJZBt4NlZCZA1qRmpMLYRTwcZD"; // Replace with your actual access token

export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json();

    if (!to || !message) {
      return NextResponse.json({ error: "Missing 'to' or 'message' in request body." }, { status: 400 });
    }

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong.", details: error }, { status: 500 });
  }
}
