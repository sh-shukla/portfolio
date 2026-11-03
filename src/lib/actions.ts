import { profile } from "@/content";

export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(profile.email);
    return true;
  } catch {
    return false;
  }
}

export function downloadResume() {
  const a = document.createElement("a");
  a.href = profile.resume;
  a.download = profile.resumeDownloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function openInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Tiny toast bus: any component can announce a short message; <Toast /> shows it.
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>("toast", { detail: message }));
}
