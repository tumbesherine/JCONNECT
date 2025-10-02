import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(req: Request) {
  try {
    const { email, password, type, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    if (type === "register") {
      // Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) return NextResponse.json({ error: signUpError.message }, { status: 500 });

      const userId = signUpData.user?.id;
      if (!userId) return NextResponse.json({ error: "Failed to get user ID after sign up" }, { status: 500 });

      // Add profile row
      const { error: profileError } = await supabase.from("profiles").insert([{ id: userId, role }]);
      if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

      return NextResponse.json({ message: "User registered successfully", user: signUpData.user });
    } else if (type === "login") {
      // Sign in the user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) return NextResponse.json({ error: signInError.message }, { status: 500 });

      return NextResponse.json({ message: "Login successful", user: signInData.user });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
