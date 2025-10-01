import { NextResponse, NextRequest } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { id } = await context.params;
  const { data, error } = await supabase
    .from("properties")
    .select()
    .eq("id", id)
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}
