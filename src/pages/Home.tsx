import React from 'react';
import { Link } from 'react-router-dom';
import { Map as Swap, Users, MessageCircle, Star, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Share Skills, Grow Together
            </h1>
            <p className="text-xl mb-8 text-primary-100 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Connect with others to exchange skills and knowledge. Teach what you know, learn what you don't.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-neutral-100">
                Get Started
              </Link>
              <Link to="/browse" className="btn bg-transparent border border-white text-white hover:bg-primary-700">
                Browse Skills
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SkillSwap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-neutral-600">
                Create your profile and list the skills you're offering and the ones you want to learn.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Communicate</h3>
              <p className="text-neutral-600">
                Message potential matches, discuss details, and arrange your skill swap sessions.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Swap className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exchange</h3>
              <p className="text-neutral-600">
                Meet up (in person or virtually) to share knowledge, then rate and review your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Skills on SkillSwap</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="card hover:translate-y-[-5px] cursor-pointer"
              >
                <img 
                  src={skill.image} 
                  alt={skill.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-neutral-600 text-sm mb-3">{skill.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-500">{skill.users} users</span>
                    <span className="flex items-center text-accent-600">
                      <Star className="h-4 w-4 mr-1 fill-accent-500 stroke-accent-500" />
                      {skill.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/browse" className="btn btn-primary inline-flex items-center">
              Browse All Skills
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-neutral-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'fill-accent-500 stroke-accent-500' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex items-center">
                  <Swap className="h-4 w-4 text-primary-500 mr-2" />
                  <span className="text-sm text-neutral-500">
                    <span className="font-medium">{testimonial.swap}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Swapping Skills?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community today and begin your journey of teaching and learning.
          </p>
          <Link to="/register" className="btn bg-white text-secondary-600 hover:bg-neutral-100">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sample data
const featuredSkills = [
  {
    name: "Web Development",
    description: "Learn to build websites and web applications using HTML, CSS, JavaScript and more.",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500",
    users: 342,
    rating: 4.8
  },
  {
    name: "Photography",
    description: "Master the art of photography, from composition to editing and everything in between.",
    image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=500",
    users: 289,
    rating: 4.7
  },
  {
    name: "Cooking",
    description: "Learn culinary techniques and recipes from home cooks and professional chefs.",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=500",
    users: 412,
    rating: 4.9
  },
  {
    name: "Language Learning",
    description: "Practice and learn new languages with native speakers and fellow language enthusiasts.",
    image: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=500",
    users: 378,
    rating: 4.6
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    quote: "I've always wanted to learn Spanish but couldn't commit to classes. Through SkillSwap, I found a native speaker who wanted to improve his programming skills. Win-win!",
    swap: "Spanish ↔ Programming"
  },
  {
    name: "Michael Chen",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    quote: "As a professional photographer, I wanted to improve my website. I found someone who needed photography lessons, and in exchange, they helped redesign my portfolio site!",
    swap: "Photography ↔ Web Design"
  },
  {
    name: "Elena Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 4,
    quote: "SkillSwap connected me with an amazing yoga instructor who needed help with video editing for her online classes. Now I'm more flexible in both my body and my skill set!",
    swap: "Video Editing ↔ Yoga"
  }
];

export default Home;