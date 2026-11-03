import { profile } from "@/content";

export default function Footer() {
  return (
    <footer className="container-page pb-10">
      <div className="flex flex-col gap-3 border-t border-line/70 pt-6 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  );
}
