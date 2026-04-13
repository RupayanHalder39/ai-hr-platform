import { useEffect, useMemo, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { CandidatesPage } from "./modules/hiring/candidates/CandidatesPage";
import { JobsPage } from "./modules/hiring/jobs/JobsPage";
import { DashboardPage } from "./modules/hiring/dashboard/DashboardPage";
import { AssignmentsPage } from "./modules/hiring/assignments/AssignmentsPage";
import { InterviewsPage } from "./modules/hiring/interviews/InterviewsPage";
import { OffersPage } from "./modules/hiring/offers/OffersPage";
import { SettingsPage } from "./modules/hiring/settings/SettingsPage";
import { AttendancePage } from "./modules/attendance/AttendancePage";
import { PayrollPage } from "./modules/payroll/PayrollPage";
import { PerformancePage } from "./modules/performance/PerformancePage";
import { LeavePage } from "./modules/leave/LeavePage";
import { OnboardingPage } from "./modules/onboarding/OnboardingPage";
import { SystemSettingsPage } from "./modules/system/SettingsPage";
import { userContext } from "./config/userContext";
import { uiText } from "./config/uiText";
import { settingsApi } from "./services/settings";
import { BASE_URL } from "./services/api";

const routeMap = {
  "/hiring/dashboard": { component: DashboardPage, title: "Dashboard" },
  "/hiring/jobs": { component: JobsPage, title: "Jobs" },
  "/hiring/candidates": { component: CandidatesPage, title: "Candidates" },
  "/hiring/assignments": { component: AssignmentsPage, title: "Assignments" },
  "/hiring/interviews": { component: InterviewsPage, title: "Interviews" },
  "/hiring/offers": { component: OffersPage, title: "Offers" },
  "/hiring/settings": { component: SettingsPage, title: "Settings Of Hiring" },
  "/settings": { component: SystemSettingsPage, title: "System Settings" },
  "/attendance": { component: AttendancePage, title: "Attendance Tracking" },
  "/payroll": { component: PayrollPage, title: "Payroll" },
  "/performance": { component: PerformancePage, title: "Performance" },
  "/leave": { component: LeavePage, title: "Leave" },
  "/onboarding": { component: OnboardingPage, title: "Onboarding" },
};

export function App() {
  const [path, setPath] = useState("/hiring/dashboard");
  const [user, setUser] = useState(userContext);
  const [dbStatus, setDbStatus] = useState("loading");
  const route = routeMap[path] || routeMap["/hiring/dashboard"];
  const Page = useMemo(() => route.component, [route.component]);

  useEffect(() => {
    const loadContext = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/health`);
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }
        setDbStatus("ok");
      } catch (error) {
        console.error("DB health check failed:", error);
        setDbStatus("error");
      }
    };
    loadContext();
  }, []);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await settingsApi.roles();
        const roles = response.data || [];
        const adminRole = roles.find((role) => role.name === "Admin") || roles[0];
        if (adminRole) {
          setUser((prev) => ({
            ...prev,
            role: adminRole.name,
            permissions: Array.isArray(adminRole.permissions) ? adminRole.permissions : prev.permissions,
          }));
        }
      } catch (error) {
        // Keep defaults if DB is not reachable.
      }
    };
    loadRoles();
  }, []);

  return (
    <Layout
      userPermissions={user.permissions}
      user={user}
      currentPath={path}
      onNavigate={setPath}
      pageTitle={route.title}
      pageSubtitle={uiText.layout.welcome(user.name)}
      notificationCount={2}
      dbStatus={dbStatus}
    >
      <Page />
    </Layout>
  );
}
