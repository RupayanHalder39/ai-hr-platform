import { useMemo, useState } from "react";
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

const routeMap = {
  "/hiring/dashboard": { component: DashboardPage, title: "Dashboard" },
  "/hiring/jobs": { component: JobsPage, title: "Jobs" },
  "/hiring/candidates": { component: CandidatesPage, title: "Candidates" },
  "/hiring/assignments": { component: AssignmentsPage, title: "Assignments" },
  "/hiring/interviews": { component: InterviewsPage, title: "Interviews" },
  "/hiring/offers": { component: OffersPage, title: "Offers" },
  "/hiring/settings": { component: SettingsPage, title: "Settings" },
  "/attendance": { component: AttendancePage, title: "Attendance Tracking" },
  "/payroll": { component: PayrollPage, title: "Payroll" },
  "/performance": { component: PerformancePage, title: "Performance" },
  "/leave": { component: LeavePage, title: "Leave" },
  "/onboarding": { component: OnboardingPage, title: "Onboarding" },
};

export function App() {
  const [path, setPath] = useState("/hiring/dashboard");
  const route = routeMap[path] || routeMap["/hiring/dashboard"];
  const Page = useMemo(() => route.component, [route.component]);

  return (
    <Layout
      userPermissions={[
        "hiring:view",
        "settings:manage",
        "attendance:view",
        "payroll:view",
        "performance:view",
        "leave:view",
        "onboarding:view",
      ]}
      currentPath={path}
      onNavigate={setPath}
      pageTitle={route.title}
      pageSubtitle="Welcome back, Admin"
      notificationCount={2}
    >
      <Page />
    </Layout>
  );
}
