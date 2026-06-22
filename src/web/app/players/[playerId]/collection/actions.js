"use server";

import { revalidatePath } from "next/cache";
import { requireApproved } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import { findOrCacheGame } from "../../../../lib/bgg";

export async function addGameToCollection(playerId, bggId) {
  const player = await requireApproved();

  if (player.id !== playerId) {
    throw new Error("You can only edit your own bookshelf.");
  }

  await findOrCacheGame(bggId);

  await db.collectionEntry.upsert({
    where: { playerId_gameId: { playerId, gameId: bggId } },
    create: { playerId, gameId: bggId },
    update: {},
  });

  revalidatePath(`/players/${playerId}/collection`);
}

export async function removeGameFromCollection(playerId, collectionEntryId) {
  const player = await requireApproved();

  if (player.id !== playerId) {
    throw new Error("You can only edit your own bookshelf.");
  }

  await db.collectionEntry.deleteMany({
    where: { id: collectionEntryId, playerId },
  });

  revalidatePath(`/players/${playerId}/collection`);
}
