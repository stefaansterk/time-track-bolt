import React from 'react';
import { Activity } from '../App';

interface ReportProps {
  activities: Activity[];
}

const Report: React.FC<ReportProps> = ({ activities }) => {
  const totalHours = activities.reduce((sum, activity) => sum + activity.duration, 0);

  const projectHours = activities.reduce((acc, activity) => {
    if (!acc[activity.project]) {
      acc[activity.project] = { total: 0, users: {} };
    }
    acc[activity.project].total += activity.duration;
    if (!acc[activity.project].users[activity.user]) {
      acc[activity.project].users[activity.user] = 0;
    }
    acc[activity.project].users[activity.user] += activity.duration;
    return acc;
  }, {} as Record<string, { total: number; users: Record<string, number> }>);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Report</h2>
      <p className="mb-2">Total hours worked: {totalHours.toFixed(2)}</p>
      <h3 className="font-semibold mt-4 mb-2">Hours per project:</h3>
      {Object.entries(projectHours).map(([project, data]) => (
        <div key={project} className="mb-4">
          <h4 className="font-semibold">{project}: {data.total.toFixed(2)} hours</h4>
          <ul className="ml-4">
            {Object.entries(data.users).map(([user, hours]) => (
              <li key={user}>
                {user}: {hours.toFixed(2)} hours
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Report;