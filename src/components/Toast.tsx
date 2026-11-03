import { useEffect, useRef, useState } from "react";

// Shows messages sent with toast() from src/lib/actions.ts. The live region is always mounted
// so screen readers announce each message.
export default function Toast() {
  const [message, setMessage] = useState("");
  const timer = useRef<number>();

  useEffect(() => {
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(""), 2400);
    };
    window.addEventListener("toast", onToast);
    return () => {
      window.removeEventListener("toast", onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {message && <p className="animate-rise rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-canvas shadow-lg">{message}</p>}
    </div>
  );
}
