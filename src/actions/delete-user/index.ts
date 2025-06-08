"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { protectedActionClient } from "@/lib/next-safe-action";

export const deleteUser = protectedActionClient.action(async ({ ctx }) => {
  await db.delete(users).where(eq(users.id, ctx.user.id));
  redirect("/authentication");
});
