import { FamilyShell } from "@/components/family-shell";

export default function Layout({ children }: LayoutProps<"/student">) {
  return <FamilyShell portal="student">{children}</FamilyShell>;
}
