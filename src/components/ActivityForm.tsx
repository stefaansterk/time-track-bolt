import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TeamMember } from '../App';

interface ActivityFormProps {
  onAddActivity: (activity: { name: string; duration: number; date: string; user: string; project: string }) => void;
  projects: string[];
  teamMembers: TeamMember[];
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity, projects, teamMembers }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [user, setUser] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && duration && date && user && project) {
      onAddActivity({ name, duration: parseFloat(duration), date, user, project });
      setName('');
      setDuration('');
      setDate(new Date().toISOString().split('T')[0]);
      setUser('');
      setProject('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> {t('addActivity')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('activityName')}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder={t('duration')}
          step="0.25"
          min="0"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">{t('selectUser')}</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={`${member.firstName} ${member.lastName}`}>
              {member.firstName} {member.lastName}
            </option>
          ))}
        </select>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">{t('selectProject')}</option>
          {projects.map((proj) => (
            <option key={proj} value={proj}>
              {proj}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {t('addActivity')}
      </button>
    </form>
  );
};

export default ActivityForm;