import React from "react";

/**
 * Semantic callout types.
 *
 * WHY THIS EXISTS:
 * Instead of forcing authors to think in terms of colours / font sizes,
 * we let them think in *teaching intent*:
 * - "definition"
 * - "exam"
 * - "tips"
 *
 * This is far more MDX-friendly and teacher-friendly.
 */
export type CalloutType = "definition" | "exam" | "tips" | "advanced";

export interface CalloutProps {
  /**
   * Optional title shown at the top of the callout
   */
  title?: string;

  /**
   * Main callout content (MDX / JSX supported)
   */
  children: React.ReactNode;

  /**
   * Semantic callout type (preferred API)
   */
  type?: CalloutType;

  /**
   * Escape hatch for rare edge cases.
   * Semantic styles still apply by default.
   */
  backgroundColor?: string;
}

/**
 * Centralised style configuration.
 *
 * WHY A SINGLE MAP:
 * - Avoids duplicated magic strings
 * - Makes future callout types trivial to add
 * - Keeps visual design decisions in one place
 *
 * Each type defines:
 * - font size
 * - left border colour
 * - background colour
 */
const CALLOUT_TYPE_STYLES: Record<
  CalloutType,
  {
    fontSize: string;
    border: string;
    background: string;
  }
> = {
  definition: {
    // Larger text to emphasise core concepts
    fontSize: "text-lg",
    // Strong neutral border for authority
    border: "border-black",
    // Soft grey background for long reading
    background: "bg-slate-100",
  },
  exam: {
    // Large text so exam content stands out immediately
    fontSize: "text-lg",
    // Strong red border = urgency / importance
    border: "border-red-500",
    // Soft red background (NOT aggressive)
    background: "bg-red-50",
  },
  tips: {
    // Slightly smaller, supportive content
    fontSize: "text-sm",
    // Neutral black border keeps it instructional
    border: "border-black",
    // Same soft grey as definition for consistency
    background: "bg-slate-100",
  },
  advanced: {
    fontSize: "text-sm",
    border: "border-slate-500",
    background: "bg-slate-50",
  },
};

export default function Callout({
  title,
  children,
  type = "definition",
  backgroundColor,
}: CalloutProps) {
  const styles = CALLOUT_TYPE_STYLES[type];

  return (
    <div
      className={`
        my-4
        rounded-md
        border-l-4
        px-4
        py-3
        leading-relaxed
        ${styles.fontSize}
        ${styles.border}
        ${backgroundColor ? "" : styles.background}
      `}
      /**
       * Background override remains supported,
       * but semantic styles take precedence by default.
       */
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {title && (
        <div className="mb-1 font-semibold text-slate-900">
          {title}
        </div>
      )}

      <div className="text-slate-700">
        {children}
      </div>
    </div>
  );
}

