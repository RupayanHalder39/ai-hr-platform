import { Bell } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function Layout({
  userPermissions = [],
  currentPath,
  onNavigate,
  pageTitle,
  pageSubtitle,
  notificationCount = 0,
  children,
}) {
  return (
    <div className="app-shell">
      <Sidebar userPermissions={userPermissions} currentPath={currentPath} onNavigate={onNavigate} />
      <main className="app-content">
        <header className="topbar">
          <div>
            <h2 className="topbar__title">{pageTitle}</h2>
            <p className="topbar__subtitle">{pageSubtitle}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell size={18} />
            {notificationCount > 0 && <span className="icon-badge">{notificationCount}</span>}
          </button>
        </header>
        <div className="page-body">{children}</div>
      </main>
    </div>
  );
}
