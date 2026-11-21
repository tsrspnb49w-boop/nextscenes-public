import { redirect } from "next/navigation";

// One definitive First Reads introduction; existing /first-reads links redirect.
export default function FirstReadsEntryRedirect() {
  redirect("/first-reads/explore");
}
