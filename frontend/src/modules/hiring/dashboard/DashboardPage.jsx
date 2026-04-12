import { useEffect, useMemo, useState } from "react";
import { Briefcase, Users, Gift, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { ClayCard, ClayMetricCard } from "../../../components/common/ClayCard";
import { Progress } from "../../../components/common/Progress";
import { Badge } from "../../../components/common/Badge";
import { Button } from "../../../components/common/Button";
import { settingsApi } from "../../../services/settings";
import { candidatesApi } from "../../../services/candidates";
import { jobsApi } from "../../../services/jobs";
import { dashboardContent } from "../../../config/dashboardContent";

export function DashboardPage() {
  const [stages, setStages] = useState([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [openRoles, setOpenRoles] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [stagesResponse, candidatesResponse, jobsResponse] = await Promise.all([
        settingsApi.stages(),
        candidatesApi.list({ page: 1, page_size: 1 }),
        jobsApi.list({ page: 1, page_size: 1 }),
      ]);
      setStages(stagesResponse.data || []);
      setTotalCandidates(candidatesResponse.meta?.total || 0);
      setOpenRoles(jobsResponse.meta?.total || 0);
    };
    load();
  }, []);

  const pipelineStages = useMemo(() => {
    return stages.map((stage, index) => ({
      id: stage.id,
      name: stage.name,
      count: 0,
      color: ["blue", "purple", "pink", "indigo", "green"][index % 5],
    }));
  }, [stages]);

  const totalInPipeline = pipelineStages.reduce((sum, stage) => sum + stage.count, 0) || 0;

  const { metrics, pipeline, approvals, activity } = dashboardContent;

  return (
    <div className="dashboard">
      <div className="dashboard__metrics">
        <ClayMetricCard
          title={metrics.openRoles.title}
          value={openRoles}
          change={metrics.openRoles.change}
          changeType={metrics.openRoles.changeType}
          icon={<Briefcase size={28} />}
          variant="blue"
        />
        <ClayMetricCard
          title={metrics.totalCandidates.title}
          value={totalCandidates}
          change={metrics.totalCandidates.change}
          changeType={metrics.totalCandidates.changeType}
          icon={<Users size={28} />}
          variant="purple"
        />
        <ClayMetricCard
          title={metrics.activeOffers.title}
          value={0}
          change={metrics.activeOffers.change}
          changeType={metrics.activeOffers.changeType}
          icon={<Gift size={28} />}
          variant="mint"
        />
        <ClayMetricCard
          title={metrics.avgTimeToHire.title}
          value={metrics.avgTimeToHire.value}
          change={metrics.avgTimeToHire.change}
          changeType={metrics.avgTimeToHire.changeType}
          icon={<TrendingUp size={28} />}
          variant="peach"
        />
      </div>

      <div className="dashboard__grid">
        <ClayCard className="dashboard__pipeline">
          <h3>{pipeline.title}</h3>
          <div className="pipeline">
            {pipelineStages.map((stage) => {
              const percentage = totalInPipeline ? (stage.count / totalInPipeline) * 100 : 0;
              return (
                <div key={stage.id} className="pipeline__row">
                  <div className="pipeline__label">
                    <span className={`pipeline__dot pipeline__dot--${stage.color}`} />
                    <span>{stage.name}</span>
                  </div>
                  <span className="pipeline__count">
                    {stage.count} candidates ({percentage.toFixed(0)}%)
                  </span>
                  <Progress value={percentage} />
                </div>
              );
            })}
          </div>
          <div className="pipeline__footer">
            <span>{pipeline.footerLabel}</span>
            <strong>{totalInPipeline}</strong>
          </div>
        </ClayCard>

        <ClayCard variant="rose" className="dashboard__approvals">
          <div className="approvals__header">
            <AlertCircle size={18} className="approvals__icon" />
            <h3>{approvals.title}</h3>
          </div>
          <div className="approvals__list">
            {approvals.items.map((approval) => (
              <div key={approval.item} className="approval-card">
                <div>
                  <p className="approval-card__title">{approval.item}</p>
                  <Badge variant="outline">{approval.type}</Badge>
                </div>
                <p className="approval-card__status">{approval.status}</p>
                <div className="approval-card__actions">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ClayCard>
      </div>

      <ClayCard variant="lavender">
        <h3>{activity.title}</h3>
        <div className="activity">
          {activity.items.map((activity) => (
            <div key={activity.action} className="activity__item">
              <div className={`activity__icon activity__icon--${activity.type}`}>
                <Clock size={16} />
              </div>
              <div className="activity__details">
                <p>{activity.action}</p>
                <span>{activity.candidate}</span>
              </div>
              <span className="activity__time">{activity.time}</span>
            </div>
          ))}
        </div>
      </ClayCard>
    </div>
  );
}
