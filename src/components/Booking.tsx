"use client";

import { useState } from "react";
import { services, site } from "@/lib/site";

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0].name);
  const [time, setTime] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const lines = [
      "Hi Nunus Barber Shop, I'd like to book an appointment.",
      `Name: ${name.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : "",
      `Service: ${service}`,
      time.trim() ? `Preferred time: ${time.trim()}` : "",
    ].filter(Boolean);
    window.open(`${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  }

  const field = "w-full rounded-full border border-line bg-black/35 px-4 py-3 text-ivory outline-none transition-colors focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.16)]";
  const label = "mb-1.5 block font-display text-[0.72rem] uppercase tracking-[0.1em] text-ivory-dim";

  return (
    <form onSubmit={submit} className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-6 sm:p-9" noValidate>
      <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-ivory">Request a booking</h3>
      <p className="mb-6 mt-1 text-sm text-ivory-dim">
        Fill this in and we&apos;ll open WhatsApp with your details ready to send.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="bk-name" className={label}>Name</label>
          <input id="bk-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="bk-phone" className={label}>Phone</label>
          <input id="bk-phone" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="Your number" />
        </div>
        <div>
          <label htmlFor="bk-service" className={label}>Service</label>
          <select id="bk-service" className={field} value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bk-time" className={label}>Preferred time</label>
          <input id="bk-time" className={field} value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. Sat morning" />
        </div>
      </div>

      <button type="submit" className="mt-6 w-full rounded-full bg-ivory py-3.5 font-display text-sm uppercase tracking-[0.06em] text-ink transition-transform hover:-translate-y-0.5">
        Send on WhatsApp
      </button>
      <p className="mt-4 text-center text-sm text-ivory-dim">
        Prefer to call? <a href={`tel:${site.phoneTel}`} className="text-gold-lite">{site.phoneDisplay}</a>
      </p>
    </form>
  );
}
