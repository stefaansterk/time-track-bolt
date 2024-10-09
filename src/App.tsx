import React, { useState, useEffect } from 'react';
import { Clock, PlusCircle, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Report from './components/Report';
import ProjectManagement from './components/ProjectManagement';
import TeamManagement from './components/TeamManagement';
import LanguageSelector from './components/LanguageSelector';

export interface Activity {
  id: string;
  name: string;
  duration: number;
  date: string;
  user: string;
  project: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function App() {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [activeTab, setActiveTab] = useState('activities');

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities');
    const storedProjects = localStorage.getItem('projects');
    const storedTeamMembers = localStorage.getItem('teamMembers');
    if (storedActivities) setActivities(JSON.parse(storedActivities));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedTeamMembers) setTeamMembers(JSON.parse(storedTeamMembers));
  }, []);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = { ...activity, id: Date.now().toString() };
    setActivities([...activities, newActivity]);
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const addProject = (project: string) => {
    setProjects([...projects, project]);
  };

  const deleteProject = (project: string) => {
    setProjects(projects.filter(p => p !== project));
    setActivities(activities.filter(activity => activity.project !== project));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeamMembers([...teamMembers, newMember]);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2" /> {t('appTitle')}
          </h1>
          <LanguageSelector />
        </header>
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'activities' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('activities')}
              >
                {t('activities')}
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('projects')}
              >
                {t('projects')}
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'team' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('team')}
              >
                {t('team')}
              </button>
            </li>
          </ul>
        </nav>
        <main>
          {activeTab === 'activities' && (
            <>
              <ActivityForm onAddActivity={addActivity} projects={projects} teamMembers={teamMembers} />
              <ActivityList activities={activities} onDeleteActivity={deleteActivity} />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setShowReport(!showReport)}
              >
                {showReport ? t('hideReport') : t('showReport')}
              </button>
              {showReport && <Report activities={activities} />}
            </>
          )}
          {activeTab === 'projects' && (
            <ProjectManagement projects={projects} onAddProject={addProject} onDeleteProject={deleteProject} />
          )}
          {activeTab === 'team' && (
            <TeamManagement teamMembers={teamMembers} onAddTeamMember={addTeamMember} onDeleteTeamMember={deleteTeamMember} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;