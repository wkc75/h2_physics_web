"use client";

import Link from "next/link";
import { ReactNode } from "react";

/**
 * SidebarLink
 *
 * A single navigational link used for subchapters in the sidebar.
 *
 * Design goals:
 * - Clear active state
 * - Consistent spacing & typography
 * - Reusable across all chapters
 * - Simple API (href + active)
 */
type SidebarLinkProps = {
  /**
   * Full route path
   */
  href: string;

  /**
   * Whether this link represents the current page
   * Used for visual highlighting
   */
  active: boolean;

  /**
   * Display text (e.g. "1.2 Errors and Uncertainties")
   */
  children: ReactNode;
};

export default function SidebarLink({
  href,
  active,
  children,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`
        block
        mt-2
        pl-2
        border-l
        transition-colors
        hover:underline
        ${
          active
            ? "border-white text-white font-semibold"
            : "border-transparent text-slate-300 hover:text-white"
        }
      `}
    >
      {children}
    </Link>
  );
}
