import { AppShell } from "@/components/layout/app-shell";

// Staff (assistants and hired teachers) portal. Screens fetch their data on the client from the FastAPI backend,
// so each page prerenders as a static shell with its own loading state.
export default function Layout({ children }: LayoutProps<"/staff">) {
  return <AppShell portal="staff">{children}</AppShell>;
}
