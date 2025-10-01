import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createBrowserClient(supabaseUrl!, supabaseKey!);

// Add property function
export async function addProperty(propertyData: {
  title: string;
  description?: string;
  price?: number;
  location?: string;
  type?: string;
  owner_id: string;
}) {
  const resp = await supabase.from("properties").insert([propertyData]);
  // keep the shape loose for client code; callers should runtime-check
  return resp as { data: any; error: any };
}

