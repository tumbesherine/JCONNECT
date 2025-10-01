import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/utils/supabase/service";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const propertyId = formData.get("propertyId") as string;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.storage
    .from("property-images")
    .upload(`${propertyId}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  // Persist image record in database so properties can reference it
  const imageUrl = data.path;
  try {
    // Use service client for DB insert and signed URL generation if available
    try {
      const svc = createServiceClient();
      await svc.from("property_images").insert([{ property_id: propertyId, url: imageUrl }]);
      // create a signed url valid for 1 hour
      const { data: signed, error: signErr } = await svc.storage
        .from("property-images")
        .createSignedUrl(`${propertyId}/${file.name}`, 60 * 60);
      if (signErr) {
        // fallback
        return NextResponse.json({ path: imageUrl });
      }
      return NextResponse.json({ path: signed.signedUrl });
    } catch (err) {
      console.error("Service client not available:", err);
      // If service key not available, attempt to insert with current server client
      await supabase.from("property_images").insert([{ property_id: propertyId, url: imageUrl }]);
      return NextResponse.json({ path: imageUrl });
    }
  } catch (e) {
    console.error("Upload persist error:", e);
    return NextResponse.json({ error: "Failed to persist image" }, { status: 500 });
  }
}
