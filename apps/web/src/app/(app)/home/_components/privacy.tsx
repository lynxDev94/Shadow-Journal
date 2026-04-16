import { Lock, Shield, ShieldCheck, Trash2 } from "lucide-react";

export const Privacy = () => {
  return (
    <section
      id="safety"
      className="bg-surface-dark/20 relative border-y border-white/5 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-brand mb-3 block text-xs font-bold tracking-widest uppercase">
              Privacy by default
            </span>
            <h2 className="font-headline mb-6 text-3xl font-light md:text-4xl">
              A private journal, not a social feed.
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              Your entries are for you. Shadow Journal is built for reflection,
              not performance: no public posting, no likes, no algorithmic
              pressure. We protect your account with a secure connection and
              sensible access controls, the way most trusted web apps do. We do
              not claim end-to-end encryption where only your device holds the
              keys.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Lock className="text-brand mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-slate-100">
                    Private by default
                  </h4>
                  <p className="text-sm text-slate-400">
                    Your journal is not a social feed. Only your signed-in
                    account can load your entries through the app.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Shield className="text-brand mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-slate-100">
                    Secure connection
                  </h4>
                  <p className="text-sm text-slate-400">
                    When you use the app, data travels over an encrypted
                    connection so it is not exposed in transit.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="text-brand mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-slate-100">
                    Your journal, your account
                  </h4>
                  <p className="text-sm text-slate-400">
                    Your entries are saved with your login and kept separate
                    from other people&apos;s data. Because the service needs to
                    read your writing to show it back to you, and when you
                    choose features like analysis, this works like a typical
                    online journal, not a vault only your device can open.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Trash2 className="text-brand mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-slate-100">
                    Delete anytime
                  </h4>
                  <p className="text-sm text-slate-400">
                    You can delete entries or your account whenever you want.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
            <img
              src="/images/privacy.png"
              alt="Locked journal on a desk"
              className="mx-auto mb-4 h-24 w-auto rounded-xl object-cover"
            />
            <p className="mb-2 font-sans text-sm font-semibold text-slate-100">
              Private by Design
            </p>
            <p className="text-xs text-slate-500">
              No public profiles. No ads. Clear about what private means here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
