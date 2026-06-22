import { XMLParser } from "fast-xml-parser";
import { db } from "./db";

const BGG_BASE_URL = "https://boardgamegeek.com/xmlapi2";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseAttributeValue: true,
  isArray: (name) => ["item", "name"].includes(name),
});

async function bggFetch(path) {
  const response = await fetch(`${BGG_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${process.env.BGG_API_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`BoardGameGeek API request failed: ${response.status}`);
  }

  return parser.parse(await response.text());
}

function primaryName(names) {
  const list = Array.isArray(names) ? names : [names];
  const primary = list.find((entry) => entry?.["@_type"] === "primary");
  return (primary ?? list[0])?.["@_value"];
}

export async function searchGames(query) {
  const data = await bggFetch(
    `/search?query=${encodeURIComponent(query)}&type=boardgame`,
  );
  const items = data.items?.item ?? [];

  return items.map((item) => ({
    bggId: item["@_id"],
    name: primaryName(item.name),
    yearPublished: item.yearpublished?.["@_value"] ?? null,
  }));
}

export async function getGameDetails(bggId) {
  const data = await bggFetch(`/thing?id=${bggId}&stats=1`);
  const item = data.items.item[0];

  return {
    bggId: item["@_id"],
    name: primaryName(item.name),
    yearPublished: item.yearpublished?.["@_value"] ?? null,
    minPlayers: item.minplayers?.["@_value"] ?? null,
    maxPlayers: item.maxplayers?.["@_value"] ?? null,
    playingTimeMinutes: item.playingtime?.["@_value"] ?? null,
    minAge: item.minage?.["@_value"] ?? null,
    description: item.description ?? null,
    thumbnailUrl: item.thumbnail ?? null,
    imageUrl: item.image ?? null,
  };
}

export async function findOrCacheGame(bggId) {
  const existing = await db.game.findUnique({ where: { bggId } });
  if (existing) {
    return existing;
  }

  const details = await getGameDetails(bggId);
  return db.game.create({ data: details });
}
