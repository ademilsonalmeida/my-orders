"use server";

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import z from "zod";
import { protectedActionClient } from "@/lib/next-safe-action";
import { redirect } from "next/navigation";

const updateProfileSchema = z.object({
  whatsapp: z.string().trim().min(1, { message: "Whatsapp é obrigatório" }),
});

export const updateProfile = protectedActionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ ctx, parsedInput }) => {
    await db
      .insert(userProfiles)
      .values({
        userId: ctx.user.id,
        whatsapp: parsedInput.whatsapp,
      })
      .returning();
    redirect("/dashboard");
  });
