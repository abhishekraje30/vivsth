import { gradient } from "@vivahspot/shared";

export default function Home() {
  return (
    <main className="flex-1 px-6 py-16 max-w-3xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-accent font-semibold">
        Vendor Portal
      </p>
      <h1 className="mt-2 text-5xl">Vivah Spot</h1>
      <p className="mt-4 text-text-soft text-lg">
        Listings, availability, enquiries and your subscription — in one place.
      </p>

      <div
        className="mt-8 h-1.5 w-40 rounded-pill"
        style={{ backgroundImage: gradient.css }}
      />

      <section className="mt-12 grid gap-3 sm:grid-cols-2">
        {[
          ["Enquiry inbox", "Respond to couples and track every lead."],
          ["Lead dashboard", "Views, contact reveals, enquiries, conversion."],
          ["Listings", "Portfolio, packages, all-in pricing."],
          ["Subscription", "Plan, payment and GST invoices."],
        ].map(([title, body]) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-text-soft">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
