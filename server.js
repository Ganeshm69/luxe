// Entry point for backend server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin SDK setup
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase ID Token
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

// Public route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Protected route for premium collections
app.get('/premium-collections', authenticateToken, (req, res) => {
  // Example premium data
  res.json({
    collections: [
      { id: 1, name: 'Pro Collection 1', description: 'Exclusive content for premium users.' },
      { id: 2, name: 'Pro Collection 2', description: 'More premium content.' }
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
