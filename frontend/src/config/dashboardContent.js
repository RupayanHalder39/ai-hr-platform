export const dashboardContent = {
  metrics: {
    openRoles: { title: "Open Roles", change: "+2 this week", changeType: "positive" },
    totalCandidates: { title: "Total Candidates", change: "+5 this week", changeType: "positive" },
    activeOffers: { title: "Active Offers", change: "1 pending approval", changeType: "neutral" },
    avgTimeToHire: { title: "Avg. Time to Hire", value: "18 days", change: "-3 days", changeType: "positive" },
  },
  pipeline: {
    title: "Hiring Pipeline",
    footerLabel: "Total in pipeline",
  },
  approvals: {
    title: "Pending Approvals",
    items: [
      { item: "Job Posting - DevOps Engineer", type: "Job", status: "Pending" },
      { item: "Offer - Emily Rodriguez", type: "Offer", status: "Finance Approval" },
    ],
  },
  activity: {
    title: "Recent Activity",
    items: [
      { action: "New application received", candidate: "Lisa Anderson", time: "2 hours ago", type: "new" },
      { action: "Interview completed", candidate: "Sarah Johnson", time: "5 hours ago", type: "completed" },
      { action: "Offer pending approval", candidate: "Emily Rodriguez", time: "1 day ago", type: "pending" },
      { action: "Assignment submitted", candidate: "Michael Chen", time: "1 day ago", type: "submitted" },
    ],
  },
};
