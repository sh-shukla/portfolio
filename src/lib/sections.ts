// Page sections, in order. Drives the nav, the mobile menu and the terminal commands.
export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

// Scrolls to a section the same way a nav link does: the hash moves the focus starting point too.
export function goTo(id: SectionId) {
  if (window.location.hash === `#${id}`) document.getElementById(id)?.scrollIntoView();
  else window.location.hash = id;
}
