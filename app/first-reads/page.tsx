import { redirect } from "next/navigation";

// Keep existing bookmarks working without maintaining a duplicate First Reads
// introduction. Readers and authors share the one Explore destination.
export default function FirstReadsRedirect() {
  redirect("/first-reads/explore");
}
