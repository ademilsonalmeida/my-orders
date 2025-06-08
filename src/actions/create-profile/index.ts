"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";
import z from "zod";

const updateProfileSchema = z.object({
  whatsapp: z.string().trim().min(1, { message: "Whatsapp é obrigatório" }),
});

export const createProfile = protectedActionClient
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
