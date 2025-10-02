import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service";

const supabase = createServiceClient();

async function checkUserRole(owner_id: string) {
  const { data: userData, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", owner_id)
    .single();

  if (error || !userData) throw new Error("Unauthorized or user not found");
  if (userData.role !== "property_owner" && userData.role !== "landlord") {
    throw new Error("Unauthorized: Only property owners or landlords can perform this action");
  }
}

export async function POST(req: Request) {
  try {
    const { property_id, url, owner_id } = await req.json();
    if (!property_id || !url || !owner_id) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await checkUserRole(owner_id);

    const { data, error } = await supabase.from("property_images").insert([{ property_id, url }]).select();
    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 403 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, owner_id } = await req.json();
    if (!id || !owner_id) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await checkUserRole(owner_id);

    const { error } = await supabase.from("property_images").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 403 });
  }
}
