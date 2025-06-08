"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";

export const getProfile = protectedActionClient.action(async ({ ctx }) => {
  //await new Promise(resolve => setTimeout(resolve, 5000));
  const profile = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, ctx.user.id),
  });

  return {
    session: {
      name: ctx.user.name,
      email: ctx.user.email,
    },
    profile: profile || { whatsapp: "", userId: ctx.user.id },
  };
});
