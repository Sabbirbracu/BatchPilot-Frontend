"use client";

import { AttendanceCard } from "./attendance-card";
import { FeeCard } from "./fee-card";
import { FitToWidth } from "../../../components/fit-to-width";
import { ModulePills } from "./module-pills";
import { MotionCore } from "./motion-core";
import { MotionLines } from "./motion-lines";
import { QuestionCard } from "./question-card";
import { ReminderCard } from "./reminder-card";
import "./hero-motion.css";

/** BatchPilot in the middle, every module around it working on its own. */
export function HeroMotion() {
  return (
    <FitToWidth width={600} height={600} slack={30}>
      <div
        className="hm-stage"
        role="img"
        aria-label="BatchPilot মাঝখানে; চারপাশে আঙুল বা কার্ডে হাজিরা, ফি আদায়, বকেয়া রিমাইন্ডার, AI প্রশ্নব্যাংক, পরীক্ষা ও রেজাল্ট, OMR, QR দিয়ে ভর্তি, অভিভাবক SMS, অনলাইন ক্লাস, ব্যাচ ও রুটিন, পোস্টার ও ক্যাম্পেইন, আর শিক্ষকের নিজের ব্র্যান্ড ও ডোমেইন — প্রতিটা নিজে নিজে কাজ করছে"
      >
        <div className="hm-grid" />
        <div className="hm-glow" />
        <MotionLines />
        <MotionCore />
        <AttendanceCard />
        <FeeCard />
        <ReminderCard />
        <QuestionCard />
        <ModulePills />
      </div>
    </FitToWidth>
  );
}
