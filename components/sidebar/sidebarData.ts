/**
 * sidebarData.ts
 *
 * This file defines the ENTIRE structure of the Physics sidebar.
 *
 * IMPORTANT IDEA:
 * - The sidebar UI does NOT know Physics.
 * - It only knows how to render this data.
 *
 * To add / edit chapters:
 * 👉 You ONLY touch this file.
 */

// ===============================
// 🔹 TYPES (for safety & clarity)
// ===============================

export type SubChapter = {
  /**
   * Display text shown in the sidebar
   */
  title: string;

  /**
   * Full route to the page
   * Must match the folder structure in /app
   */
  path: string;
};

export type Chapter = {
  /**
   * Unique ID used for React state
   * (lowercase, no spaces)
   */
  id: string;

  /**
   * Chapter title shown to users
   */
  title: string;

  /**
   * where the big chapter link goes to
   */
  landingPath?: string;

  /**
   * Base route for this chapter
   * Used to auto-open the correct chapter
   */
  basePath: string;

  /**
   * List of subchapters under this chapter
   */
  subChapters: SubChapter[];
};

// ===============================
// 🔹 SIDEBAR STRUCTURE DATA
// ===============================

export const sidebarChapters: Chapter[] = [
  // ===============================
  // 📘 1. Quantities and Measurements
  // ===============================
  {
    id: "measurements",
    title: "1. Quantities and Measurements",
    landingPath: "/physics/measurements/learning_outcomes",
    basePath: "/physics/measurements",
    subChapters: [
      {
        title: "1.1 Physical Quantities and Prefixes",
        path: "/physics/measurements/physical_quantities_prefixes",
      },
      {
        title: "1.2 Errors and Uncertainties",
        path: "/physics/measurements/errors_and_uncertainties",
      },
      {
        title: "1.3 Scalar and Vector Quantities",
        path: "/physics/measurements/scalar_and_vector",
      },
    ],
  },

  // ===============================
  // 📘 2. Forces and Moments
  // ===============================
  {
    id: "Forces and Moments",
    title: "2. Forces and Moments",
    landingPath: "/physics/forces_and_moments/learning_outcomes",
    basePath: "/physics/forces_and_moments",
    subChapters: [
      {
        title: "2.1 Type of Forces",
        path: "/physics/forces_and_moments/type_of_forces",
      },
      {
        title: "2.2 Moment and Torque",
        path: "/physics/forces_and_moments/moment_and_torque",
      },
      {
        title: "2.3 Translational and Rotational Equilibrium",
        path: "/physics/forces_and_moments/equilibrium",
      },
    ],
  },

  // ===============================
  // 📘 3. Motion and Forces
  // ===============================
  {
    id: "motion_and_forces",
    title: "3. Motion and Forces",
    landingPath: "/physics/motion_and_forces/learning_outcomes",
    basePath: "/physics/motion_and_forces",
    subChapters: [
      {
        title: "3.1 Kinematics",
        path: "/physics/motion_and_forces/kinematics",
      },
      {
        title: "3.2 Newton's Laws of Motion",
        path: "/physics/motion_and_forces/newtons_laws",
      },
    ],
  },
];
