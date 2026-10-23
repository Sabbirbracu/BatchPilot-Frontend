import { AppShell } from "@/components/layout/app-shell";

// Teacher (owner / স্যার) portal. Screens fetch their data on the client from the FastAPI backend,
// so each page prerenders as a static shell with its own loading state.
export default function Layout({ children }: LayoutProps<"/teacher">) {
  return <AppShell portal="teacher">{children}</AppShell>;
}
