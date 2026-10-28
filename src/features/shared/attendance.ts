// Attendance colours and thresholds shared by the batch and student screens.

export function attendanceColor(rate: number): string {
  return rate < 70 ? "#E5484D" : rate < 85 ? "#F5B800" : "#12B76A";
}

/** Text colour for an attendance figure on white. */
export function attendanceText(rate: number): string {
  return rate < 70 ? "#D92D20" : rate < 80 ? "#B07C00" : "#039855";
}

/** Below this a student shows up under "কম উপস্থিতি". */
export const LOW_ATTENDANCE = 75;
