"use client";

import { useEffect, useState } from "react";
import { hours, hoursRows } from "@/lib/site";
import { SectionHead } from "./SectionHead";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function nowInJoburg() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Johannesburg",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const map: Record<string, string> = {};
    parts.forEach((p) => (map[p.type] = p.value));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    const hh = parseInt(map.hour, 10) % 24;
    return { day, mins: hh * 60 + parseInt(map.minute, 10) };
  } catch {
    const d = new Date();
    let mins = d.getUTCHours() * 60 + d.getUTCMinutes() + 120; // SAST = UTC+2
    let day = d.getUTCDay();
    if (mins >= 1440) { mins -= 1440; day = (day + 1) % 7; }
    return { day, mins };
  }
}

export function Hours() {
  const [msg, setMsg] = useState("Mon–Fri 09:00–18:00 · Sat 08:00–15:30 · Sun 09:00–14:00");
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const t = nowInJoburg();
      setToday(t.day);
      const win = hours[t.day];
      if (win && t.mins >= win[0] && t.mins < win[1]) {
        const soon = win[1] - t.mins <= 45;
        setOpenNow(true);
        setMsg(`Open now · until ${fmt(win[1])}${soon ? " (closing soon)" : ""}`);
      } else if (win && t.mins < win[0]) {
        setOpenNow(false);
        setMsg(`Closed · opens today at ${fmt(win[0])}`);
      } else {
        setOpenNow(false);
        for (let k = 1; k <= 7; k++) {
          const d = (t.day + k) % 7;
          if (hours[d]) {
            setMsg(`Closed · opens ${DAY[d]} at ${fmt(hours[d]![0])}`);
            break;
          }
        }
      }
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hours" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="Opening Times" title="Hours" />
      <div className="mb-8 flex justify-center">
        <p
          aria-live="polite"
          className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-display text-sm uppercase tracking-[0.12em] ${
            openNow === null ? "border-line text-ivory-dim" : openNow ? "border-emerald-500/40 text-emerald-300" : "border-line text-ivory-dim"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              openNow === null ? "bg-ivory-dim" : openNow ? "animate-pulse bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.18)]" : "bg-ivory-faint"
            }`}
          />
          {msg}
        </p>
      </div>

      <table className="mx-auto w-full max-w-xl border-collapse">
        <caption className="sr-only">Weekly opening hours for Nunus Barber Shop</caption>
        <tbody>
          {hoursRows.map((r) => {
            const isToday = today === r.day;
            return (
              <tr
                key={r.day}
                className={isToday ? "bg-[linear-gradient(90deg,rgba(201,169,110,0.12),transparent)]" : ""}
              >
                <th
                  scope="row"
                  className={`border-b border-white/5 py-4 text-left font-display text-[0.92rem] uppercase tracking-[0.08em] ${
                    isToday ? "text-gold-lite" : "text-ivory"
                  }`}
                >
                  {isToday && <span className="mr-1 align-middle text-[0.6em] text-gold">●</span>}
                  {r.label}
                </th>
                <td className={`border-b border-white/5 py-4 text-right ${isToday ? "text-gold-lite" : "text-ivory-dim"}`}>{r.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
