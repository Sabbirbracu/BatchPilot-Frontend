import { FamilyShell } from "@/components/family-shell";

export default function Layout({ children }: LayoutProps<"/guardian">) {
  return <FamilyShell portal="guardian">{children}</FamilyShell>;
}
