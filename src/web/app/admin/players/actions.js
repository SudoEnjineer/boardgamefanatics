"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function approvePlayer(playerId) {
  await requireAdmin();

  await db.player.update({
    where: { id: playerId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/admin/players");
}
