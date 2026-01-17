import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }
  
  if (!apiKey) {
    return NextResponse.json({ error: "No API key" }, { status: 500 });
  }
  
  if (!apiSecret) {
    return NextResponse.json({ error: "No API secret" }, { status: 500 });
  }

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, issued);

  return NextResponse.json({ token });
}
