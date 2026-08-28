import { supabase } from "@/lib/supabase";

export async function ensureDemoSession() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (session?.user) {
    return session.user;
  }

  const {
    data,
    error,
  } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error(
      "Unable to create demo session."
    );
  }

  return data.user;
}