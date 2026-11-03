import { profile } from "@/content";

export default function Footer() {
  return (
    <footer className="bg-black pb-10 text-white/45">
      <div className="container-page flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>
          <a href="#top" className="hover:text-white">Back to top</a>
        </p>
      </div>
    </footer>
  );
}
