import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface ProjectManagementProps {
  projects: string[];
  onAddProject: (project: string) => void;
  onDeleteProject: (project: string) => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ projects, onAddProject, onDeleteProject }) => {
  const [newProject, setNewProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.trim()) {
      onAddProject(newProject.trim());
      setNewProject('');
    }
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> Manage Projects
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="New project name"
            className="border p-2 rounded-l flex-grow"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600">
            Add Project
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project} className="py-2 flex justify-between items-center">
            <span>{project}</span>
            <button
              onClick={() => onDeleteProject(project)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;