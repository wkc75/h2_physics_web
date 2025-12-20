"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { sidebarChapters } from "./sidebarData";

/**
 * Sidebar
 *
 * Accordion rules:
 * ✅ At most ONE chapter open at a time
 * ✅ Closed chapters reserve ZERO space (no gaps)
 * ✅ Smooth open/close transitions (no layout jumps)
 */
export default function Sidebar() {
  const pathname = usePathname();

  // ===============================
  // 🔹 SIDEBAR COLLAPSE STATE
  // ===============================
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ===============================
  // 🔹 ACCORDION OPEN STATE (SINGLE SOURCE OF TRUTH)
  // ===============================
  // null means: no chapter open (compact default)
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  // ===============================
  // 🔹 AUTO-OPEN BASED ON ROUTE
  // ===============================
  useEffect(() => {
    // Find the first chapter whose basePath matches the current route
    const match = sidebarChapters.find((c) => pathname.startsWith(c.basePath));

    // If we are inside a chapter route, keep it open; otherwise close all.
    setOpenChapterId(match ? match.id : null);
  }, [pathname]);

  // ===============================
  // 🔹 CLICK HANDLER (ACCORDION TOGGLE)
  // ===============================
  function toggleChapter(chapterId: string) {
    setOpenChapterId((current) => (current === chapterId ? null : chapterId));
  }

  return (
    <aside
      className={`
        relative
        h-screen
        bg-slate-900
        text-white
        transition-[width]
        duration-300
        ease-in-out
        ${sidebarOpen ? "w-64" : "w-14"}
      `}
    >
      {/* ===============================
          🔹 CHATGPT-STYLE TOGGLE HANDLE
          =============================== */}
      <div
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="
          absolute
          right-0
          top-0
          h-full
          w-4
          cursor-pointer
          bg-slate-900
          hover:bg-slate-800
          flex
          items-center
          justify-center
          transition-colors
        "
        aria-label="Toggle sidebar"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setSidebarOpen((p) => !p);
        }}
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-300 ${
            sidebarOpen ? "" : "rotate-180"
          }`}
        />
      </div>

      {/* ===============================
          🔹 SIDEBAR CONTENT
          =============================== */}
      <div
        className={`
          h-full
          overflow-hidden
          transition-opacity
          duration-200
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Site title */}
        <Link href="/" className="block p-4 text-lg font-bold hover:underline">
          GCE A Level Physics
        </Link>

        <nav className="px-4 text-sm space-y-2">
          {sidebarChapters.map((chapter) => {
            const isOpen = openChapterId === chapter.id;

            return (
              <div key={chapter.id} className="select-none">
                {/* ===============================
                    🔹 CHAPTER HEADER
                    =============================== */}
                <div className="flex items-center gap-2 font-semibold">
                  {/* Chevron button toggles accordion open state */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.id)}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded
                      p-1
                      hover:bg-slate-800
                      transition-colors
                    "
                    aria-label={
                      isOpen ? `Collapse ${chapter.title}` : `Expand ${chapter.title}`
                    }
                    aria-expanded={isOpen}
                  >
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Chapter title navigates (kept as your original UX) */}
                  <Link
                    href={chapter.landingPath || chapter.basePath}
                    className="flex-1 hover:underline"
                  >
                    {chapter.title}
                  </Link>
                </div>

                {/* ===============================
                    🔹 SUBCHAPTERS (TRUE COLLAPSE, NO RESERVED SPACE)
                    ===============================
                    We use a grid-row animation:
                    - closed: grid-rows-[0fr] => height collapses to 0
                    - open:   grid-rows-[1fr] => height expands to fit content
                    This avoids layout gaps and looks like a real accordion.
                 */}
                <div
                  className={`
                    ml-6
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ease-in-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  {/* min-h-0 is CRUCIAL in grid collapse patterns */}
                  <div
                    className={`
                      min-h-0
                      overflow-hidden
                      transition-all
                      duration-300
                      ease-out
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
                    `}
                    style={{
                      // Optional polish: slight stagger so opacity follows height
                      transitionDelay: isOpen ? "70ms" : "0ms",
                    }}
                  >
                    {chapter.subChapters.map((sub) => (
                      <SidebarLink
                        key={sub.path}
                        href={sub.path}
                        active={pathname === sub.path}
                      >
                        {sub.title}
                      </SidebarLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/**
 * SidebarLink
 *
 * Single subchapter link with active highlighting.
 */
function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        block
        mt-2
        hover:underline
        ${active ? "font-semibold text-white" : "text-slate-300"}
      `}
    >
      {children}
    </Link>
  );
}
