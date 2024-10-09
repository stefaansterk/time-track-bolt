import React from 'react';
import { Trash2 } from 'lucide-react';
import { Activity } from '../App';

interface ActivityListProps {
  activities: Activity[];
  onDeleteActivity: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onDeleteActivity }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Activity List</h2>
      {activities.length === 0 ? (
        <p>No activities recorded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{activity.name}</p>
                <p className="text-sm text-gray-600">
                  {activity.duration} hours | {activity.date} | {activity.user} | {activity.project}
                </p>
              </div>
              <button
                onClick={() => onDeleteActivity(activity.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;