-- Player.id must be a native uuid column to match auth.users.id (also uuid),
-- otherwise the FK constraint added in add_auth_trigger cannot be created.
ALTER TABLE "Player" ALTER COLUMN "id" SET DATA TYPE UUID USING ("id"::uuid);
