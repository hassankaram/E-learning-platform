const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock endpoints
const courses = [
  { id: 1, name: 'Python for Beginners', category: 'Python' },
  { id: 2, name: 'Advanced Python', category: 'Python' },
];

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.post('/api/auth/signup', (req, res) => {
  res.json({ message: 'Signup successful' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Mock server running on port ${PORT}`));
