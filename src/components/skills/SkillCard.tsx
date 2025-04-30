import React from 'react';
import { Star, Clock, Award } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: string;
  yearsExperience: number;
  willing: boolean;
  description: string;
  userId?: string;
  userName?: string;
}

interface SkillCardProps {
  skill: Skill;
  onClick?: () => void;
  showUser?: boolean;
  compact?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  skill, 
  onClick, 
  showUser = false,
  compact = false
}) => {
  // Helper function to get background color based on skill level
  const getLevelBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'skill-badge-beginner';
      case 'intermediate':
        return 'skill-badge-intermediate';
      case 'advanced':
        return 'skill-badge-advanced';
      case 'expert':
        return 'skill-badge-expert';
      default:
        return 'skill-badge-beginner';
    }
  };
  
  if (compact) {
    return (
      <div 
        className="card cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={onClick}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <span className={`skill-badge ${getLevelBadgeClass(skill.level)}`}>
              {skill.level}
            </span>
          </div>
          <div className="flex items-center text-sm text-neutral-600 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{skill.yearsExperience} {skill.yearsExperience === 1 ? 'year' : 'years'} experience</span>
          </div>
          {showUser && skill.userName && (
            <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-700">{skill.userName}</span>
              <button className="text-xs text-primary-600 hover:text-primary-700">View Profile</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="card cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{skill.name}</h3>
          <span className={`skill-badge ${getLevelBadgeClass(skill.level)}`}>
            {skill.level}
          </span>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">{skill.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-sm text-neutral-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{skill.yearsExperience} {skill.yearsExperience === 1 ? 'year' : 'years'} experience</span>
          </div>
          
          {skill.willing && (
            <div className="flex items-center text-sm text-success-500">
              <Award className="h-4 w-4 mr-1" />
              <span>Willing to teach</span>
            </div>
          )}
        </div>
        
        {showUser && skill.userName && (
          <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700">{skill.userName}</span>
            <button className="text-xs text-primary-600 hover:text-primary-700">View Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;