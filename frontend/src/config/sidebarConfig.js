import { uiText } from "./uiText";

const sidebarConfig = [
  {
    id: "hiring",
    label: "Hiring Process",
    type: "accordion",
    requiredPermissions: ["hiring:view"],
    items: [
      { id: "dashboard", label: "Dashboard", path: "/hiring/dashboard", requiredPermissions: ["hiring:view"] },
      { id: "jobs", label: "Jobs", path: "/hiring/jobs", requiredPermissions: ["hiring:view"] },
      { id: "candidates", label: "Candidates", path: "/hiring/candidates", requiredPermissions: ["hiring:view"] },
      { id: "assignments", label: "Assignments", path: "/hiring/assignments", requiredPermissions: ["hiring:view"] },
      { id: "interviews", label: "Interviews", path: "/hiring/interviews", requiredPermissions: ["hiring:view"] },
      { id: "offers", label: "Offers", path: "/hiring/offers", requiredPermissions: ["hiring:view"] },
      { id: "hiring-settings", label: uiText.nav.hiringSettings, path: "/hiring/settings", requiredPermissions: ["settings:manage"] },
    ],
  },
  {
    id: "attendance",
    label: "Attendance Tracking",
    path: "/attendance",
    requiredPermissions: ["attendance:view"],
  },
  {
    id: "payroll",
    label: "Payroll",
    path: "/payroll",
    requiredPermissions: ["payroll:view"],
  },
  {
    id: "performance",
    label: "Performance",
    path: "/performance",
    requiredPermissions: ["performance:view"],
  },
  {
    id: "leave",
    label: "Leave",
    path: "/leave",
    requiredPermissions: ["leave:view"],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    path: "/onboarding",
    requiredPermissions: ["onboarding:view"],
  },
  {
    id: "system",
    label: uiText.nav.system,
    type: "accordion",
    items: [
      { id: "system-settings", label: uiText.nav.systemSettings, path: "/settings", requiredPermissions: ["settings:manage"] },
    ],
    requiredPermissions: ["settings:manage"],
  },
];

export default sidebarConfig;
