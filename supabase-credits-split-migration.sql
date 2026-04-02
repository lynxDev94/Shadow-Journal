-- =====================================================
-- Split credits: subscription (plan) vs bonus (top-ups)
-- Run in Supabase SQL Editor ONCE on existing projects.
-- =====================================================

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS subscription_credits INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS bonus_credits INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.users_sync_credits_available()
RETURNS TRIGGER AS $$
BEGIN
  NEW.credits_available := COALESCE(NEW.subscription_credits, 0) + COALESCE(NEW.bonus_credits, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_sync_credits_available_trigger ON public.users;
CREATE TRIGGER users_sync_credits_available_trigger
  BEFORE INSERT OR UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.users_sync_credits_available();

-- Migrate existing balances into subscription pool (top-ups were not tracked separately before).
UPDATE public.users
SET
  subscription_credits = COALESCE(credits_available, 0),
  bonus_credits = 0;

CREATE TABLE IF NOT EXISTS public.stripe_subscription_credit_events (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
