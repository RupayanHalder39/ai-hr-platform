import { useEffect, useMemo, useState } from "react";
import { Briefcase, Users, Gift, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { ClayCard, ClayMetricCard } from "../../../components/common/ClayCard";
import { Progress } from "../../../components/common/Progress";
import { Badge } from "../../../components/common/Badge";
import { Button } from "../../../components/common/Button";
import { ClaySpinner } from "../../../components/common/ClaySpinner";
import { EmptyState } from "../../../components/common/EmptyState";
import { settingsApi } from "../../../services/settings";
import { candidatesApi } from "../../../services/candidates";
import { jobsApi } from "../../../services/jobs";
import { uiText } from "../../../config/uiText";

const iconPool = [
  <Briefcase key="briefcase" size={28} />,
  <Users key="users" size={28} />,
  <Gift key="gift" size={28} />,
  <TrendingUp key="trend" size={28} />,
];

const variantPool = ["blue", "purple", "mint", "peach"];
const pipelineColors = ["blue", "purple", "pink", "indigo", "green"];

const titleCase = (value) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function DashboardPage() {
  const [statuses, setStatuses] = useState([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [openRoles, setOpenRoles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [statusesResponse, candidatesResponse, jobsResponse] = await Promise.all([
          settingsApi.statuses(),
          candidatesApi.list({ page: 1, page_size: 1 }),
          jobsApi.list({ page: 1, page_size: 1 }),
        ]);
        setStatuses(statusesResponse.data || []);
        setTotalCandidates(candidatesResponse.meta?.total || 0);
        setOpenRoles(jobsResponse.meta?.total || 0);
      } catch (err) {
        setError(uiText.common.error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const groupedStatuses = useMemo(() => {
    const map = {};
    statuses.forEach((status) => {
      const key = status.entity_type || "general";
      if (!map[key]) map[key] = [];
      map[key].push(status);
    });
    return Object.entries(map).map(([entityType, items]) => ({
      entityType,
      items,
    }));
  }, [statuses]);

  const metrics = useMemo(() => {
    const dynamic = groupedStatuses.slice(0, 4).map((group, index) => ({
      id: group.entityType,
      title: titleCase(group.entityType),
      value: group.items.length,
      icon: iconPool[index % iconPool.length],
      variant: variantPool[index % variantPool.length],
    }));

    if (dynamic.length === 0) {
      return [
        {
          id: "jobs",
          title: uiText.jobs.title,
          value: openRoles,
          icon: iconPool[0],
          variant: variantPool[0],
        },
        {
          id: "candidates",
          title: uiText.candidates.title,
          value: totalCandidates,
          icon: iconPool[1],
          variant: variantPool[1],
        },
      ];
    }

    return dynamic;
  }, [groupedStatuses, openRoles, totalCandidates]);

  const pipelineGroup = groupedStatuses[0] || { entityType: "pipeline", items: [] };

  const pipelineStages = useMemo(() => {
    return pipelineGroup.items.map((status, index) => ({
      id: status.id,
      name: status.name,
      count: 0,
      color: pipelineColors[index % pipelineColors.length],
    }));
  }, [pipelineGroup]);

  const totalInPipeline = pipelineStages.reduce((sum, stage) => sum + stage.count, 0) || 0;

  const approvalItems = useMemo(() => {
    return groupedStatuses
      .filter((group) => ["job", "offer"].includes(group.entityType))
      .flatMap((group) =>
        group.items.map((status) => ({
          id: `${group.entityType}-${status.id}`,
          type: titleCase(group.entityType),
          status: status.name,
        }))
      );
  }, [groupedStatuses]);

  const activityItems = useMemo(() => {
    return groupedStatuses
      .filter((group) => group.entityType === "interview")
      .flatMap((group) =>
        group.items.map((status) => ({
          id: status.id,
          label: status.name,
          type: group.entityType,
        }))
      );
  }, [groupedStatuses]);

  if (loading) {
    return (
      <div className="dashboard">
        <ClayCard className="dashboard__pipeline">
          <ClaySpinner label={uiText.dashboard.loading} />
        </ClayCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <ClayCard className="dashboard__pipeline">
          <EmptyState message={error} />
        </ClayCard>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__metrics">
        {metrics.map((metric) => (
          <ClayMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            variant={metric.variant}
          />
        ))}
      </div>

      <div className="dashboard__grid">
        <ClayCard className="dashboard__pipeline">
          <h3>{`${titleCase(pipelineGroup.entityType)} ${uiText.dashboard.pipelineSuffix}`}</h3>
          <div className="pipeline">
            {pipelineStages.length === 0 && <EmptyState message={uiText.dashboard.pipelineEmpty} />}
            {pipelineStages.map((stage) => {
              const percentage = totalInPipeline ? (stage.count / totalInPipeline) * 100 : 0;
              return (
                <div key={stage.id} className="pipeline__row">
                  <div className="pipeline__label">
                    <span className={`pipeline__dot pipeline__dot--${stage.color}`} />
                    <span>{stage.name}</span>
                  </div>
                  <span className="pipeline__count">
                    {stage.count} {uiText.dashboard.pipelineCountLabel} ({percentage.toFixed(0)}%)
                  </span>
                  <Progress value={percentage} />
                </div>
              );
            })}
          </div>
          <div className="pipeline__footer">
            <span>{uiText.dashboard.pipelineFooter}</span>
            <strong>{totalInPipeline}</strong>
          </div>
        </ClayCard>

        <ClayCard variant="rose" className="dashboard__approvals">
          <div className="approvals__header">
            <AlertCircle size={18} className="approvals__icon" />
            <h3>{uiText.dashboard.approvalsTitle}</h3>
          </div>
          <div className="approvals__list">
            {approvalItems.length === 0 && (
              <div className="approval-card">
                <EmptyState message={uiText.dashboard.approvalsEmpty} />
              </div>
            )}
            {approvalItems.map((approval) => (
              <div key={approval.id} className="approval-card">
                <div>
                  <p className="approval-card__title">{approval.status}</p>
                  <Badge variant="outline">{approval.type}</Badge>
                </div>
                <div className="approval-card__actions">
                  <Button size="sm">{uiText.dashboard.approve}</Button>
                  <Button size="sm" variant="outline">
                    {uiText.dashboard.review}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ClayCard>
      </div>

      <ClayCard variant="lavender">
        <h3>{uiText.dashboard.activityTitle}</h3>
        <div className="activity">
          {activityItems.length === 0 && <EmptyState message={uiText.dashboard.activityEmpty} />}
          {activityItems.map((activity) => (
            <div key={activity.id} className="activity__item">
              <div className="activity__icon activity__icon--pending">
                <Clock size={16} />
              </div>
              <div className="activity__details">
                <p>{activity.label}</p>
                <span>{titleCase(activity.type)}</span>
              </div>
            </div>
          ))}
        </div>
      </ClayCard>
    </div>
  );
}
