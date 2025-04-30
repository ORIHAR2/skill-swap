import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SkillCard from '../components/skills/SkillCard';
import { ArrowRight, Users, MessageCircle, Map as Swap, Star, Plus } from 'lucide-react';

// Types
interface Skill {
  id: string;
  name: string;
  level: string;
  yearsExperience: number;
  willing: boolean;
  description: string;
}

interface SkillSwap {
  id: string;
  requester: string;
  provider: string;
  requestedSkill: string;
  offeredSkill: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  created: string;
  updated: string;
  rating: number | null;
  feedback: string | null;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  skills: Skill[];
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [pendingSwaps, setPendingSwaps] = useState<SkillSwap[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  useEffect(() => {
    // In a real app, these would be API calls
    // Mock data for demo
    const mockPendingSwaps: SkillSwap[] = [
      {
        id: '1',
        requester: '1',
        provider: '2',
        requestedSkill: 'Pottery',
        offeredSkill: 'JavaScript',
        status: 'pending',
        created: '2023-08-15T16:30:00.000Z',
        updated: '2023-08-15T16:30:00.000Z',
        rating: null,
        feedback: null
      }
    ];
    
    const mockRecentMessages: Message[] = [
      {
        id: '2',
        senderId: '2',
        receiverId: '1',
        content: 'Hi John! Thank you for the kind words. I would absolutely be interested in learning JavaScript from you. When would you be available to start?',
        timestamp: '2023-08-15T15:45:00.000Z',
        read: false
      }
    ];
    
    const mockSuggestedUsers: User[] = [
      {
        id: '2',
        name: 'Jane Doe',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
        skills: [
          { 
            id: '1', 
            name: 'Pottery', 
            level: 'Expert', 
            yearsExperience: 10, 
            willing: true,
            description: 'Specializing in wheel-thrown pottery and ceramic sculptures'
          }
        ]
      },
      {
        id: '3',
        name: 'Robert Smith',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
        skills: [
          { 
            id: '1', 
            name: 'Piano', 
            level: 'Advanced', 
            yearsExperience: 8, 
            willing: true,
            description: 'Classical and jazz piano instruction for all levels'
          }
        ]
      }
    ];
    
    setPendingSwaps(mockPendingSwaps);
    setRecentMessages(mockRecentMessages);
    setSuggestedUsers(mockSuggestedUsers);
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Welcome, {currentUser.name}</h1>
            <p className="text-neutral-600 mt-1">Here's what's happening with your skill swaps</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/browse" className="btn btn-primary">
              Find New Skills
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Skills Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Skills</h2>
                <Link to="/profile" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                  Edit Skills <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {currentUser.skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentUser.skills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} compact />
                  ))}
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-4 flex flex-col items-center justify-center text-neutral-500 hover:text-primary-500 hover:border-primary-300 cursor-pointer transition-colors">
                    <Plus className="h-8 w-8 mb-2" />
                    <span>Add New Skill</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500 mb-4">You haven't added any skills yet</p>
                  <Link to="/profile" className="btn btn-primary">
                    Add Skills
                  </Link>
                </div>
              )}
            </section>

            {/* Pending Swaps Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Skill Swaps</h2>
                <Link to="/swaps" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {pendingSwaps.length > 0 ? (
                <div className="space-y-4">
                  {pendingSwaps.map(swap => (
                    <div key={swap.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {swap.requester === currentUser.id ? 
                              `You requested to learn ${swap.requestedSkill}` : 
                              `Someone wants to learn ${swap.requestedSkill} from you`}
                          </p>
                          <p className="text-sm text-neutral-500">
                            In exchange for: <span className="text-neutral-700">{swap.offeredSkill}</span>
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            {new Date(swap.created).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          {swap.provider === currentUser.id && swap.status === 'pending' && (
                            <>
                              <button className="btn btn-sm btn-primary">Accept</button>
                              <button className="btn btn-sm btn-outline">Decline</button>
                            </>
                          )}
                          {swap.requester === currentUser.id && swap.status === 'pending' && (
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm">
                              Awaiting Response
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500 mb-4">No pending skill swaps</p>
                  <Link to="/browse" className="btn btn-primary">
                    Find Skills to Swap
                  </Link>
                </div>
              )}
            </section>
            
            {/* Recent Messages Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Messages</h2>
                <Link to="/messages" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`border rounded-lg p-4 ${!message.read ? 'bg-primary-50 border-primary-200' : 'border-neutral-200'}`}
                    >
                      <div className="flex items-start">
                        <img 
                          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100" 
                          alt="Jane Doe"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium">Jane Doe</h4>
                            <span className="text-xs text-neutral-500">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-neutral-700 line-clamp-2">{message.content}</p>
                          <div className="mt-2">
                            <Link 
                              to={`/chat/${message.senderId}`}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              Reply
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500">No recent messages</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Statistics */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <Users className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary-700">2</p>
                  <p className="text-sm text-neutral-600">Connections</p>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <Swap className="h-6 w-6 text-secondary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-secondary-700">1</p>
                  <p className="text-sm text-neutral-600">Active Swaps</p>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent-700">3</p>
                  <p className="text-sm text-neutral-600">Messages</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <Star className="h-6 w-6 text-neutral-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-neutral-700">0</p>
                  <p className="text-sm text-neutral-600">Reviews</p>
                </div>
              </div>
            </section>
            
            {/* Suggested Users */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recommended Matches</h2>
              
              <div className="space-y-4">
                {suggestedUsers.map(user => (
                  <div key={user.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-xs text-neutral-500">Matching interests</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Top skill:</p>
                      <div className="flex items-center">
                        <span className={`skill-badge ${user.skills[0].level === 'Expert' ? 'skill-badge-expert' : 'skill-badge-advanced'}`}>
                          {user.skills[0].name}
                        </span>
                        <span className="text-xs text-neutral-500 ml-2">
                          {user.skills[0].yearsExperience} years
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link 
                        to={`/user/${user.id}`}
                        className="btn btn-sm btn-outline flex-1"
                      >
                        View Profile
                      </Link>
                      <Link 
                        to={`/chat/${user.id}`}
                        className="btn btn-sm btn-primary flex-1"
                      >
                        Message
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  to="/browse"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  See More Matches
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;