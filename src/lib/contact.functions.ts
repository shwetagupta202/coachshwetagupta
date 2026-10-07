import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { contactSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const source = getRequestHeader("cf-connecting-ip") || getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || data.email.toLowerCase();
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
    const rateKey = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const { data: id, error } = await supabaseAdmin.rpc("submit_contact", {
      p_name: data.name,
      p_email: data.email,
      p_message: data.message,
      p_rate_key: rateKey,
    });
    if (error) return { success: false, message: "Your message could not be saved. Please try again." };
    if (!id) return { success: false, message: "Too many messages. Please try again in 10 minutes." };
    return { success: true, message: "Thank you! Your message has been received." };
  });