import { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/common/Table";
import { ClayCard } from "../../components/common/ClayCard";
import { Badge } from "../../components/common/Badge";
import { ClaySpinner } from "../../components/common/ClaySpinner";
import { EmptyState } from "../../components/common/EmptyState";
import { settingsApi } from "../../services/settings";
import { uiText } from "../../config/uiText";

const permissionVariant = (permission) => {
  if (permission.includes(":delete")) return "danger";
  if (permission.includes(":manage") || permission.includes(":edit")) return "purple";
  if (permission.includes(":view")) return "info";
  return "outline";
};

export function SystemSettingsPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await settingsApi.roles();
        setRoles(response.data || []);
      } catch (err) {
        setError(uiText.settings.rolesError);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const columns = useMemo(
    () => [
      { key: "name", label: uiText.settings.table.role },
      { key: "permissions", label: uiText.settings.table.permissions },
    ],
    []
  );

  const tableData = roles.map((role) => ({
    ...role,
    permissions: role.permissions || [],
  }));

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>{uiText.settings.systemTitle}</h1>
          <p>{uiText.settings.systemSubtitle}</p>
        </div>
      </header>
      <ClayCard className="card">
        <div className="card__header">{uiText.settings.rolesTitle}</div>
        <div className="card__body">
          {loading && <ClaySpinner label={uiText.settings.loadingRoles} />}
          {error && !loading && <EmptyState message={error} />}
          {!loading && !error && tableData.length === 0 && <EmptyState message={uiText.common.empty} />}
          {!loading && !error && tableData.length > 0 && (
            <Table
              columns={columns}
              data={tableData.map((role) => ({
                ...role,
                permissions: (
                  <div className="badge-list">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant={permissionVariant(permission)}>
                        {permission}
                      </Badge>
                    ))}
                  </div>
                ),
              }))}
            />
          )}
        </div>
      </ClayCard>
    </section>
  );
}
