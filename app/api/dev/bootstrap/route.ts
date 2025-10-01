import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/utils/supabase/service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email || `dev+${Date.now()}@example.com`;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Try service client first for admin operations
    try {
      const svc = createServiceClient();
      // Insert into users table and return id
      const { data, error } = await svc.from("users").insert([{ email }]).select();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ user: data[0] });
  } catch {
      // Fallback: try to insert with regular server client (may fail if RLS blocks)
      const { data, error } = await supabase.from("users").insert([{ email }]).select();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ user: data[0] });
    }
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
