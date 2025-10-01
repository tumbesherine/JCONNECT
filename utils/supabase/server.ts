import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createClient = (cookieStoreOrPromise: any) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      // getAll must be async because Next's cookies() is async in route handlers
      async getAll() {
        try {
          const cookieStore = await (cookieStoreOrPromise as any);
          const arr: { name: string; value: string }[] = [];
          const all = (cookieStore as any).getAll?.() || [];
          for (const c of all) {
            if (c && c.name) arr.push({ name: c.name, value: String(c.value) });
          }
          return arr;
        } catch (err) {
          return [];
        }
      },
      async setAll(_cookiesToSet: any) {
        // noop in most server contexts; implement if you need to set cookies
        return;
      },
    },
  });
};
export default createClient;
