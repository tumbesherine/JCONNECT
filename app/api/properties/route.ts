import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/utils/supabase/service";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: props, error } = await supabase.from("properties").select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // fetch images for all properties
    const ids = (props || []).map((p: any) => p.id);
    if (ids.length === 0) return NextResponse.json([]);
    const { data: images } = await supabase
      .from("property_images")
      .select("property_id, url")
      .in("property_id", ids);

    const map: Record<string, string[]> = {};
    (images || []).forEach((img: any) => {
      map[img.property_id] = map[img.property_id] || [];
      map[img.property_id].push(img.url);
    });

    const result = (props || []).map((p: any) => ({
      ...p,
      images: map[p.id] || [],
    }));
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.title || !body.owner_id) {
      return NextResponse.json({ error: "Missing property data or owner_id" }, { status: 400 });
    }
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("properties").insert([body]).select();
    if (error) {
      const msg = String(error.message || error);
      if (msg.toLowerCase().includes("foreign key") || msg.toLowerCase().includes("violates")) {
        // If caller asked to auto-create owner, try to create the users row using service client
        if (body.auto_create_owner) {
          try {
            const svc = createServiceClient();
            // attempt to create a users row with the owner_id (if provided as uuid) or create and return a new id
            if (body.owner_id) {
              // If owner_id is a placeholder uuid, try insert with id
              await svc.from("users").insert([{ id: body.owner_id, email: body.owner_email || null }]);
            } else {
              const { data: u } = await svc.from("users").insert([{ email: body.owner_email || `dev+${Date.now()}@example.com` }]).select();
              body.owner_id = u?.[0]?.id;
            }
            // retry insert
            const retry = await supabase.from("properties").insert([body]).select();
            if (retry.error) return NextResponse.json({ error: retry.error.message }, { status: 500 });
            return NextResponse.json(retry.data[0]);
          } catch (svcErr) {
            return NextResponse.json({ error: "Failed to auto-create owner: " + String(svcErr) }, { status: 500 });
          }
        }
        return NextResponse.json({ error: "owner_id not found in users table or violates foreign key constraint. Ensure the owner exists or use a valid owner_id." }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  return NextResponse.json((data && data[0]) || null);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("properties").update(body).eq("id", body.id).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
