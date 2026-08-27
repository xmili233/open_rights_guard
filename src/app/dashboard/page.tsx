import { readFile } from "node:fs/promises";
import path from "node:path";

import { Dashboard5 } from "@/components/dashboard5";

export default async function DashboardPage() {
  const guide = await readFile(
    path.join(process.cwd(), "docs/dashboard-design.md"),
    "utf8",
  );

  return <Dashboard5 guide={guide} />;
}
