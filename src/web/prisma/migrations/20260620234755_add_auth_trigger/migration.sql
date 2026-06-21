-- Links Player rows to Supabase's auth.users and auto-creates a PENDING
-- Player row on signup. Guarded because the `auth` schema only exists on
-- Supabase-hosted Postgres, not local dev Postgres (docker-compose.dev.yml).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
    ALTER TABLE "Player" ADD CONSTRAINT "Player_id_fkey" FOREIGN KEY ("id") REFERENCES auth.users(id) ON DELETE CASCADE;

    CREATE OR REPLACE FUNCTION public.handle_new_player()
    RETURNS trigger AS $func$
    BEGIN
      INSERT INTO public."Player" (id, "displayName", status, role, "createdAt")
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
        'PENDING',
        'PLAYER',
        now()
      );
      RETURN NEW;
    END;
    $func$ LANGUAGE plpgsql SECURITY DEFINER;

    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_player();
  END IF;
END
$$;
