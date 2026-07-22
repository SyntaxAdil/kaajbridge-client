import { NextResponse } from "next/server";
import { apiRequest } from "@/services/api-client";

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const data = await apiRequest(`/company/admin/${id}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
