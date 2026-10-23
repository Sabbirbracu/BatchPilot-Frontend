"use client";

import { AttendanceCard } from "./attendance-card";
import { FeeCard } from "./fee-card";
import { FitToWidth } from "./fit-to-width";
import { ModulePills } from "./module-pills";
import { MotionCore } from "./motion-core";
import { MotionLines } from "./motion-lines";
import { QuestionCard } from "./question-card";
import { ReminderCard } from "./reminder-card";
import "./hero-motion.css";

/** BatchPilot in the middle, every module around it working on its own. */
export function HeroMotion() {
  return (
    <FitToWidth width={600} height={560}>
      <div
        className="hm-stage"
        role="img"
        aria-label="BatchPilot মাঝখানে; চারপাশে হাজিরা, ফি আদায়, বকেয়া রিমাইন্ডার, AI প্রশ্নব্যাংক, পরীক্ষা, SMS, রুটিন ও ওয়েবসাইট — প্রতিটা নিজে নিজে কাজ করছে"
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
