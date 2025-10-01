import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Use Supabase auth server methods to get current user
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return NextResponse.json({ error: error.message }, { status: 401 });
    const user = data.user || null;
    // If you maintain a separate roles table, query it here. For now, return user only.
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
