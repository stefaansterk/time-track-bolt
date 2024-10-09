import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { TeamMember } from '../App';

interface TeamManagementProps {
  teamMembers: TeamMember[];
  onAddTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  onDeleteTeamMember: (id: string) => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ teamMembers, onAddTeamMember, onDeleteTeamMember }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && email) {
      onAddTeamMember({ firstName, lastName, email });
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> Manage Team
      </h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Team Member
        </button>
      </form>
      <ul className="divide-y divide-gray-200">
        {teamMembers.map((member) => (
          <li key={member.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{member.firstName} {member.lastName}</p>
              <p className="text-sm text-gray-600">{member.email}</p>
            </div>
            <button
              onClick={() => onDeleteTeamMember(member.id)}
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

export default TeamManagement;