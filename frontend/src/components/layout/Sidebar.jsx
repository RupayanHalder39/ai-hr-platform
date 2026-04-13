import { useEffect, useMemo, useState } from "react";
import {
  Users,
  LayoutDashboard,
  Briefcase,
  UserCheck,
  FileText,
  Video,
  Gift,
  Settings,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import sidebarConfig from "../../config/sidebarConfig";
import { hasPermissions } from "../../utils/permissions";
import { uiText } from "../../config/uiText";

const sectionIcons = {
  hiring: Users,
  attendance: Clock,
  payroll: DollarSign,
  performance: TrendingUp,
  leave: Calendar,
  onboarding: ClipboardCheck,
  system: Settings,
};

const itemIcons = {
  dashboard: LayoutDashboard,
  jobs: Briefcase,
  candidates: UserCheck,
  assignments: FileText,
  interviews: Video,
  offers: Gift,
  settings: Settings,
  "system-settings": Settings,
  "hiring-settings": Settings,
};

export function Sidebar({ userPermissions = [], user, dbStatus, currentPath, onNavigate }) {
  const [openId, setOpenId] = useState(null);

  const items = useMemo(() => {
    return sidebarConfig.filter((item) => hasPermissions(userPermissions, item.requiredPermissions || []));
  }, [userPermissions]);

  useEffect(() => {
    if (!openId) {
      const firstAccordion = items.find((item) => item.type === "accordion");
      if (firstAccordion) setOpenId(firstAccordion.id);
    }
  }, [items, openId]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">AI HR Platform</h1>
        <p className="sidebar__subtitle">Internal Dashboard</p>
        {dbStatus === "error" && <span className="sidebar__db-badge">{uiText.layout.dbError}</span>}
      </div>

      <nav className="sidebar__nav">
        {items.map((section) => {
          const SectionIcon = sectionIcons[section.id] || Users;
          const isAccordion = section.type === "accordion";
          const isOpen = openId === section.id;

          if (!isAccordion) {
            return (
              <div key={section.id} className="sidebar__section">
                <button
                  type="button"
                  className={`sidebar__single ${currentPath === section.path ? "is-active" : ""}`}
                  onClick={() => onNavigate?.(section.path)}
                >
                  <SectionIcon className="sidebar__item-icon" />
                  {section.label}
                </button>
              </div>
            );
          }

          return (
            <div key={section.id} className="sidebar__section">
              <button
                type="button"
                className="sidebar__section-toggle"
                onClick={() => toggle(section.id)}
              >
                <span className="sidebar__section-label">
                  <SectionIcon className="sidebar__icon" />
                  {section.label}
                </span>
                <ChevronDown className={`sidebar__chevron ${isOpen ? "is-open" : ""}`} />
              </button>

              {isOpen && (
                <div className="sidebar__section-items">
                  {section.items
                    .filter((child) => hasPermissions(userPermissions, child.requiredPermissions || []))
                    .map((child) => {
                      const ItemIcon = itemIcons[child.id] || LayoutDashboard;
                      const isActive = currentPath === child.path;
                      return (
                        <button
                          key={child.id}
                          type="button"
                          className={`sidebar__link ${isActive ? "is-active" : ""}`}
                          onClick={() => onNavigate?.(child.path)}
                        >
                          <ItemIcon className="sidebar__item-icon" />
                          {child.label}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button type="button" className="sidebar__profile">
          <span className="sidebar__avatar">{(user?.name || "A").slice(0, 1).toUpperCase()}</span>
          <span>
            <span className="sidebar__profile-name">{user?.name || "-"}</span>
            <span className="sidebar__profile-sub">
              {user?.role ? `${user.role} · ` : ""}
              {uiText.layout.switchRole}
            </span>
          </span>
          <ChevronDown className="sidebar__chevron" />
        </button>
      </div>
    </aside>
  );
}
