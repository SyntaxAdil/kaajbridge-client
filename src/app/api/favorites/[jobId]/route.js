import { NextResponse } from "next/server";
import { apiRequest } from "@/services/api-client";

export async function POST(_request, { params }) {
  try {
    const { jobId } = await params;
    const data = await apiRequest(`/favorites/${jobId}`, {
      method: "POST",
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { jobId } = await params;
    const data = await apiRequest(`/favorites/${jobId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
