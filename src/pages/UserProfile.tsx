import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SkillCard from '../components/skills/SkillCard';
import { MapPin, Mail, Calendar, ArrowRight, MessageCircle, Map as Swap } from 'lucide-react';

// Types
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  skills: Skill[];
  interests: string[];
  location: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
  yearsExperience: number;
  willing: boolean;
  description: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would be an API call to get user data
    // Simulating API call with mock data
    setTimeout(() => {
      if (id === '2') {
        setUser({
          id: '2',
          username: 'janedoe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          bio: 'Professional potter with my own studio. Interested in learning coding.',
          avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
          skills: [
            { 
              id: '1', 
              name: 'Pottery', 
              level: 'Expert', 
              yearsExperience: 10, 
              willing: true,
              description: 'Specializing in wheel-thrown pottery and ceramic sculptures. I can teach basic to advanced techniques for creating functional and decorative ceramics. I have experience teaching beginners and helping them develop their skills.'
            },
            { 
              id: '2', 
              name: 'Woodworking', 
              level: 'Advanced', 
              yearsExperience: 7, 
              willing: true,
              description: 'Custom furniture design and small wooden crafts. I can teach how to use various tools safely and effectively to create beautiful wooden items from scratch.'
            },
          ],
          interests: ['JavaScript', 'Web Development', 'App Design'],
          location: 'Portland, OR'
        });
      } else {
        // Default user for any other ID
        setUser({
          id: id || '3',
          username: 'user',
          name: 'Sample User',
          email: 'user@example.com',
          bio: 'This is a sample user profile.',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
          skills: [
            { 
              id: '1', 
              name: 'Photography', 
              level: 'Intermediate', 
              yearsExperience: 4, 
              willing: true,
              description: 'Portrait and landscape photography with DSLR cameras.' 
            }
          ],
          interests: ['Music', 'Cooking', 'Hiking'],
          location: 'Seattle, WA'
        });
      }
      setIsLoading(false);
    }, 600);
  }, [id]);

  const handleRequestSwap = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowSwapModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse-slow">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="mb-4">Sorry, we couldn't find a user with that ID.</p>
        <Link to="/browse" className="btn btn-primary">
          Browse Skills
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          
          {/* Profile Header */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="mt-4 md:mt-0 md:ml-6 md:mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center text-neutral-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="max-w-2xl">
                <p className="text-neutral-700 mb-4">{user.bio}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">Interested In Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-neutral-500">
                  <div className="flex items-center mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Member since June 2023</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <Link 
                  to={`/chat/${user.id}`}
                  className="btn btn-primary flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Skills {user.name} Can Teach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.skills.map(skill => (
              <div key={skill.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                    <span className={`skill-badge ${
                      skill.level === 'Expert' ? 'skill-badge-expert' : 
                      skill.level === 'Advanced' ? 'skill-badge-advanced' : 
                      skill.level === 'Intermediate' ? 'skill-badge-intermediate' : 
                      'skill-badge-beginner'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  
                  <p className="text-neutral-700 mb-4">{skill.description}</p>
                  
                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <span>{skill.yearsExperience} years experience</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleRequestSwap(skill)}
                    >
                      <Swap className="h-5 w-5 mr-2" />
                      Request Skill Swap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Swap Modal */}
      {showSwapModal && selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full animate-fade-in">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Request Skill Swap</h3>
              
              <p className="mb-4">
                You're requesting to learn <strong>{selectedSkill.name}</strong> from <strong>{user.name}</strong>.
              </p>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Which skill would you like to offer in exchange?</h4>
                
                {currentUser?.skills && currentUser.skills.length > 0 ? (
                  <div className="space-y-3">
                    {currentUser.skills.map(skill => (
                      <div 
                        key={skill.id}
                        className="flex items-center p-3 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer"
                      >
                        <input 
                          type="radio" 
                          name="offeredSkill" 
                          id={`skill-${skill.id}`}
                          className="mr-3"
                        />
                        <label htmlFor={`skill-${skill.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium">{skill.name}</div>
                          <div className="text-sm text-neutral-600">{skill.level} · {skill.yearsExperience} years</div>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-neutral-500 mb-2">You haven't added any skills yet</p>
                    <Link to="/profile" className="text-primary-600 hover:text-primary-700">
                      Add skills to your profile
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Add a message (optional)
                </label>
                <textarea 
                  className="input min-h-[100px]"
                  placeholder="Introduce yourself and let them know why you're interested in learning this skill..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowSwapModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    // In a real app, this would send the request
                    alert("Skill swap request sent!");
                    setShowSwapModal(false);
                  }}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;