import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { FamilyOverview } from "@/lib/types";

/** Every child on this phone, at every teacher, plus join requests still waiting. */
export function useFamily() {
  return useQuery({ queryKey: ["dashboard", "family"], queryFn: () => api<FamilyOverview>("/dashboard/family") });
}

/** Children are matched across teachers by name, so one switcher chip covers "Rafi" everywhere. */
export const childKey = (name: string) => name.trim().toLowerCase();
