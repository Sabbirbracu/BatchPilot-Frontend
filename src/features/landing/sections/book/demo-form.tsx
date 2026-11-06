"use client";

import clsx from "clsx";
import { useState } from "react";
import { latinDigits } from "@/lib/format";
import { whatsappWith } from "../../content/contact";

const STUDENTS = ["৫০ জনের কম", "৫০–১৫০ জন", "১৫০–৩০০ জন", "৩০০ জনের বেশি"];
const DEVICES = ["ফিঙ্গারপ্রিন্ট", "RFID কার্ড", "এখনো জানি না"];

const FIELD = "h-12 w-full rounded-[14px] border border-[#E4DDF5] bg-white px-3.5 text-[16px] text-[#17161F] outline-none placeholder:text-[#9E9BAD] focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10";

/**
 * Demo request. It doesn't store anything: on send it opens WhatsApp with the details typed out, and the
 * visitor presses send there. Until a WhatsApp number is set in content/contact.ts it says it can't send yet.
 */
export function DemoForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [students, setStudents] = useState(STUDENTS[1]);
  const [device, setDevice] = useState(DEVICES[2]);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [state, setState] = useState<"idle" | "opened" | "no-number">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = latinDigits(phone).replace(/\D/g, "");
    const next = {
      name: name.trim() ? undefined : "আপনার নাম লিখুন",
      phone: /^01\d{9}$/.test(digits) ? undefined : "১১ অঙ্কের মোবাইল নম্বর দিন, যেমন 01712345678",
    };
    setErrors(next);
    if (next.name || next.phone) return;
    const text = [
      "আসসালামু আলাইকুম, BatchPilot-এর ফ্রি ডেমো চাই।",
      `নাম: ${name.trim()}`,
      `মোবাইল: ${digits}`,
      area.trim() && `এলাকা: ${area.trim()}`,
      `স্টুডেন্ট: ${students}`,
      `ডিভাইস: ${device}`,
    ]
      .filter(Boolean)
      .join("\n");
    const href = whatsappWith(text);
    if (!href) return setState("no-number");
    window.open(href, "_blank", "noopener");
    setState("opened");
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[26px] bg-white p-5 text-left text-[#17161F] shadow-[0_30px_60px_-30px_rgba(23,22,31,.6)] sm:p-7">
      <p className="m-0 text-[22px] font-bold">ফ্রি ডেমো বুক করুন</p>
      <p className="m-0 mt-1 text-[15px] text-[#5E5B6E]">১ মিনিট লাগবে। আমরা ফোন করে সময় ঠিক করে নেব।</p>

      <div className="mt-5 space-y-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[14.5px] font-semibold">আপনার নাম *</span>
          <input value={name} onChange={(e) => (setName(e.target.value), setErrors((x) => ({ ...x, name: undefined })))} placeholder="যেমন: রফিক স্যার" autoComplete="name" className={clsx(FIELD, errors.name && "border-[#F04438]")} />
          {errors.name && <span className="mt-1 block text-[13px] text-[#D92D20]">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[14.5px] font-semibold">মোবাইল নম্বর *</span>
          <input value={phone} onChange={(e) => (setPhone(e.target.value), setErrors((x) => ({ ...x, phone: undefined })))} placeholder="01XXXXXXXXX" inputMode="tel" autoComplete="tel" className={clsx(FIELD, errors.phone && "border-[#F04438]")} />
          {errors.phone && <span className="mt-1 block text-[13px] text-[#D92D20]">{errors.phone}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[14.5px] font-semibold">এলাকা</span>
          <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="যেমন: বগুড়া সদর" className={FIELD} />
        </label>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-1.5 text-[14.5px] font-semibold">কতজন স্টুডেন্ট?</legend>
          <div className="grid grid-cols-2 gap-2">
            {STUDENTS.map((s) => (
              <Choice key={s} on={students === s} onClick={() => setStudents(s)}>
                {s}
              </Choice>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-1.5 text-[14.5px] font-semibold">হাজিরার ডিভাইস</legend>
          <div className="grid grid-cols-3 gap-2">
            {DEVICES.map((d) => (
              <Choice key={d} on={device === d} onClick={() => setDevice(d)}>
                {d}
              </Choice>
            ))}
          </div>
        </fieldset>
      </div>

      <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F5B800] px-5 py-4 text-[18px] font-bold text-[#2E1065] shadow-[0_12px_26px_-12px_rgba(245,184,0,.9)] hover:bg-[#FFC61A] active:scale-[0.99]">
        ডেমো বুক করুন →
      </button>
      {state === "opened" && <p className="m-0 mt-3 rounded-[12px] bg-[#ECFDF3] px-3 py-2 text-[14px] text-[#027A48]">WhatsApp খুলেছে — মেসেজটা পাঠালেই আমরা ফোন করব।</p>}
      {state === "no-number" && <p className="m-0 mt-3 rounded-[12px] bg-[#FFF7DB] px-3 py-2 text-[14px] text-[#7A5800]">দুঃখিত, এই মুহূর্তে ফর্মটা পাঠানো যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।</p>}
      <p className="m-0 mt-3 text-center text-[13px] text-[#6B6880]">আপনার নম্বর শুধু ডেমোর জন্য — কাউকে দেওয়া হয় না।</p>
    </form>
  );
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={clsx(
        "min-h-11 rounded-[12px] px-2 py-2 text-[14px] leading-tight font-semibold transition-colors",
        on ? "bg-[#5B21B6] text-white" : "bg-[#F7F5FC] text-[#3B3850] hover:bg-[#EFEBF8]",
      )}
    >
      {children}
    </button>
  );
}
