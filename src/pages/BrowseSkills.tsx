import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillCard from '../components/skills/SkillCard';
import { Search, Filter, X } from 'lucide-react';

// Types
interface Skill {
  id: string;
  name: string;
  level: string;
  yearsExperience: number;
  willing: boolean;
  description: string;
  userId: string;
  userName: string;
}

interface FilterOptions {
  search: string;
  level: string[];
  minExperience: number;
}

const BrowseSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    level: [],
    minExperience: 0
  });

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating API call with mock data
    setTimeout(() => {
      const mockSkills: Skill[] = [
        {
          id: '1',
          name: 'JavaScript',
          level: 'Advanced',
          yearsExperience: 5,
          willing: true,
          description: 'Full-stack development with modern frameworks like React and Node.js',
          userId: '1',
          userName: 'John Doe'
        },
        {
          id: '2',
          name: 'Python',
          level: 'Intermediate',
          yearsExperience: 3,
          willing: true,
          description: 'Data analysis and backend development with Python',
          userId: '1',
          userName: 'John Doe'
        },
        {
          id: '3',
          name: 'Pottery',
          level: 'Expert',
          yearsExperience: 10,
          willing: true,
          description: 'Specializing in wheel-thrown pottery and ceramic sculptures',
          userId: '2',
          userName: 'Jane Doe'
        },
        {
          id: '4',
          name: 'Woodworking',
          level: 'Advanced',
          yearsExperience: 7,
          willing: true,
          description: 'Custom furniture design and small wooden crafts',
          userId: '2',
          userName: 'Jane Doe'
        },
        {
          id: '5',
          name: 'Piano',
          level: 'Advanced',
          yearsExperience: 8,
          willing: true,
          description: 'Classical and jazz piano instruction for all levels',
          userId: '3',
          userName: 'Robert Smith'
        },
        {
          id: '6',
          name: 'Spanish',
          level: 'Expert',
          yearsExperience: 15,
          willing: true,
          description: 'Native Spanish speaker. Can teach conversational Spanish, grammar, and writing.',
          userId: '4',
          userName: 'Maria Garcia'
        },
        {
          id: '7',
          name: 'Photography',
          level: 'Intermediate',
          yearsExperience: 4,
          willing: true,
          description: 'Portrait and landscape photography, including composition and editing techniques.',
          userId: '5',
          userName: 'David Lee'
        },
        {
          id: '8',
          name: 'Yoga',
          level: 'Advanced',
          yearsExperience: 6,
          willing: true,
          description: 'Certified yoga instructor specializing in Vinyasa and Hatha styles.',
          userId: '6',
          userName: 'Sarah Johnson'
        }
      ];
      
      setSkills(mockSkills);
      setFilteredSkills(mockSkills);
      setIsLoading(false);
    }, 500);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = () => {
      let result = [...skills];
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(skill => 
          skill.name.toLowerCase().includes(searchLower) || 
          skill.description.toLowerCase().includes(searchLower) ||
          skill.userName.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply level filter
      if (filters.level.length > 0) {
        result = result.filter(skill => 
          filters.level.includes(skill.level)
        );
      }
      
      // Apply min experience filter
      if (filters.minExperience > 0) {
        result = result.filter(skill => 
          skill.yearsExperience >= filters.minExperience
        );
      }
      
      setFilteredSkills(result);
    };
    
    applyFilters();
  }, [filters, skills]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleLevelChange = (level: string) => {
    setFilters(prev => {
      if (prev.level.includes(level)) {
        return { ...prev, level: prev.level.filter(l => l !== level) };
      } else {
        return { ...prev, level: [...prev.level, level] };
      }
    });
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, minExperience: parseInt(e.target.value) || 0 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      level: [],
      minExperience: 0
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Browse Skills</h1>
            <p className="text-neutral-600 mt-1">Find skills you want to learn or people to teach</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search skills, descriptions, or users..."
                className="input pl-10"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2">
              <button 
                className="btn btn-outline flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
                {(filters.level.length > 0 || filters.minExperience > 0) && (
                  <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                    {filters.level.length + (filters.minExperience > 0 ? 1 : 0)}
                  </span>
                )}
              </button>
              {(filters.level.length > 0 || filters.minExperience > 0) && (
                <button 
                  className="btn btn-outline flex items-center"
                  onClick={clearFilters}
                >
                  <X className="h-5 w-5 mr-2" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-medium mb-3 text-neutral-700">Skill Level</h3>
                <div className="flex flex-wrap gap-2">
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                    <button
                      key={level}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.level.includes(level)
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
                      }`}
                      onClick={() => handleLevelChange(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3 text-neutral-700">
                  Minimum Experience: {filters.minExperience} years
                </h3>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={filters.minExperience}
                  onChange={handleExperienceChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>0 years</span>
                  <span>15+ years</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} found
          </p>
        </div>

        {/* Skills Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse-slow">Loading skills...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <Link key={skill.id} to={`/user/${skill.userId}`}>
                  <SkillCard skill={skill} showUser />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-600 mb-4">No skills match your search criteria</p>
                <button 
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseSkills;