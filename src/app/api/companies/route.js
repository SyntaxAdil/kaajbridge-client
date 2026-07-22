import { NextResponse } from "next/server";
import { apiRequest } from "@/services/api-client";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const data = await apiRequest("/company", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
