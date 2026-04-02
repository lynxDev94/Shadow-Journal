import { supabaseServer } from "@/lib/auth/supabase-server";

export type CreditPoolDelta = { sub: number; bonus: number };

export type DeductCreditsResult =
  | { ok: true; newBalance: number; refund: CreditPoolDelta }
  | { ok: false };

/** Deduct credits (subscription pool first, then bonus). Same rules as client `deductUserCredits`. */
export async function deductUserCreditsServer(
  userId: string,
  creditsToDeduct: number,
): Promise<DeductCreditsResult> {
  const { data: currentUser, error: fetchError } = await supabaseServer
    .from("users")
    .select("subscription_credits, bonus_credits")
    .eq("id", userId)
    .single();

  if (fetchError) throw fetchError;

  const sub = (currentUser?.subscription_credits as number) ?? 0;
  const bonus = (currentUser?.bonus_credits as number) ?? 0;
  const currentBalance = sub + bonus;
  if (currentBalance < creditsToDeduct) {
    return { ok: false };
  }

  let newSub = sub;
  let newBonus = bonus;
  let remaining = creditsToDeduct;
  if (remaining <= sub) {
    newSub = sub - remaining;
  } else {
    remaining -= sub;
    newSub = 0;
    newBonus = bonus - remaining;
  }

  const { error } = await supabaseServer
    .from("users")
    .update({
      subscription_credits: newSub,
      bonus_credits: newBonus,
    })
    .eq("id", userId);

  if (error) throw error;

  return {
    ok: true,
    newBalance: newSub + newBonus,
    refund: { sub: sub - newSub, bonus: bonus - newBonus },
  };
}

/** Restore credits after a failed paid operation (mirrors prior deduction pools). */
export async function refundUserCreditsServer(
  userId: string,
  refund: CreditPoolDelta,
): Promise<void> {
  if (refund.sub === 0 && refund.bonus === 0) return;

  const { data: row, error: fetchError } = await supabaseServer
    .from("users")
    .select("subscription_credits, bonus_credits")
    .eq("id", userId)
    .single();

  if (fetchError) throw fetchError;

  const { error } = await supabaseServer
    .from("users")
    .update({
      subscription_credits:
        ((row?.subscription_credits as number) ?? 0) + refund.sub,
      bonus_credits: ((row?.bonus_credits as number) ?? 0) + refund.bonus,
    })
    .eq("id", userId);

  if (error) throw error;
}

/** Returns false if this id was already processed (idempotent webhook handling). */
export async function claimStripeSubscriptionCreditEvent(id: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("stripe_subscription_credit_events")
    .insert({ id });

  if (!error) return true;
  if (error.code === "23505") return false;
  console.error("claimStripeSubscriptionCreditEvent:", error);
  return false;
}

export async function refillSubscriptionCredits(userId: string, planCap: number): Promise<void> {
  const { error } = await supabaseServer
    .from("users")
    .update({ subscription_credits: planCap })
    .eq("id", userId);

  if (error) throw new Error(`refillSubscriptionCredits: ${error.message}`);
}
