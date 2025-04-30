import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import jwt from 'jsonwebtoken';

// Setup dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store (would be replaced with a database in production)
let users = [
  {
    id: '1',
    username: 'johndoe',
    password: '$2a$10$X7VYHy.2U9rkGB7HT8JIleYpQQic7Bi7Cuu6Q3JwOpnq1SvTlTE9K', // password123
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer with 5 years of experience. Looking to learn pottery and woodworking.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    skills: [
      { 
        id: '1', 
        name: 'JavaScript', 
        level: 'Advanced', 
        yearsExperience: 5, 
        willing: true,
        description: 'Full-stack development with modern frameworks like React and Node.js'
      },
      { 
        id: '2', 
        name: 'Python', 
        level: 'Intermediate', 
        yearsExperience: 3, 
        willing: true,
        description: 'Data analysis and backend development'
      },
    ],
    interests: ['Pottery', 'Woodworking', 'Photography'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    username: 'janedoe',
    password: '$2a$10$X7VYHy.2U9rkGB7HT8JIleYpQQic7Bi7Cuu6Q3JwOpnq1SvTlTE9K', // password123
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
        description: 'Specializing in wheel-thrown pottery and ceramic sculptures'
      },
      { 
        id: '2', 
        name: 'Woodworking', 
        level: 'Advanced', 
        yearsExperience: 7, 
        willing: true,
        description: 'Custom furniture design and small wooden crafts'
      },
    ],
    interests: ['JavaScript', 'Web Development', 'App Design'],
    location: 'Portland, OR'
  }
];

let messages = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Jane, I love your pottery work! Would you be interested in swapping skills? I can teach you JavaScript.',
    timestamp: '2023-08-15T14:30:00.000Z',
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Hi John! Thank you for the kind words. I would absolutely be interested in learning JavaScript from you. When would you be available to start?',
    timestamp: '2023-08-15T15:45:00.000Z',
    read: false
  }
];

let swaps = [
  {
    id: '1',
    requester: '1',
    provider: '2',
    requestedSkill: 'Pottery',
    offeredSkill: 'JavaScript',
    status: 'pending', // pending, accepted, completed, declined
    created: '2023-08-15T16:30:00.000Z',
    updated: '2023-08-15T16:30:00.000Z',
    rating: null,
    feedback: null
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  // In a real app, you would use bcrypt.compare to check hashed passwords
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '24h' });
  
  // Don't send the password to the client
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({ user: userWithoutPassword, token });
});

app.get('/api/users', authenticateToken, (req, res) => {
  // Return users without passwords
  const safeUsers = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  res.json(safeUsers);
});

app.get('/api/users/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Don't send the password to the client
  const { password: _, ...userWithoutPassword } = user;
  
  res.json(userWithoutPassword);
});

app.get('/api/skills', authenticateToken, (req, res) => {
  // Extract all skills from all users
  const allSkills = users.flatMap(user => 
    user.skills.map(skill => ({
      ...skill,
      userId: user.id,
      userName: user.name
    }))
  );
  
  res.json(allSkills);
});

app.get('/api/messages', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userMessages = messages.filter(
    msg => msg.senderId === userId || msg.receiverId === userId
  );
  
  res.json(userMessages);
});

app.post('/api/messages', authenticateToken, (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  
  if (!receiverId || !content) {
    return res.status(400).json({ message: 'Receiver ID and content are required' });
  }
  
  const newMessage = {
    id: (messages.length + 1).toString(),
    senderId,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get('/api/swaps', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userSwaps = swaps.filter(
    swap => swap.requester === userId || swap.provider === userId
  );
  
  res.json(userSwaps);
});

app.post('/api/swaps', authenticateToken, (req, res) => {
  const { providerId, requestedSkill, offeredSkill } = req.body;
  const requesterId = req.user.id;
  
  if (!providerId || !requestedSkill || !offeredSkill) {
    return res.status(400).json({ message: 'Provider ID, requested skill, and offered skill are required' });
  }
  
  const newSwap = {
    id: (swaps.length + 1).toString(),
    requester: requesterId,
    provider: providerId,
    requestedSkill,
    offeredSkill,
    status: 'pending',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    rating: null,
    feedback: null
  };
  
  swaps.push(newSwap);
  res.status(201).json(newSwap);
});

app.put('/api/swaps/:id', authenticateToken, (req, res) => {
  const { status, rating, feedback } = req.body;
  const swapId = req.params.id;
  const userId = req.user.id;
  
  const swapIndex = swaps.findIndex(s => s.id === swapId);
  
  if (swapIndex === -1) {
    return res.status(404).json({ message: 'Swap not found' });
  }
  
  const swap = swaps[swapIndex];
  
  // Only the provider can accept/decline a swap
  if (status && swap.provider !== userId) {
    return res.status(403).json({ message: 'Only the skill provider can update the status' });
  }
  
  // Only the requester can rate and provide feedback
  if ((rating || feedback) && swap.requester !== userId) {
    return res.status(403).json({ message: 'Only the skill requester can provide rating and feedback' });
  }
  
  // Update swap
  swaps[swapIndex] = {
    ...swap,
    status: status || swap.status,
    rating: rating !== undefined ? rating : swap.rating,
    feedback: feedback || swap.feedback,
    updated: new Date().toISOString()
  };
  
  res.json(swaps[swapIndex]);
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});