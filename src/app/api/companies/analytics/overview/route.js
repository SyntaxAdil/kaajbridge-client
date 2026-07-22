import { NextResponse } from "next/server";
import { apiRequest } from "@/services/api-client";

export async function GET() {
  try {
    const data = await apiRequest("/company/analytics/overview", {
      method: "GET",
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
