import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { JSONDb } from './db.js'; // Use .js extension for ES Module imports when compiled/run

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  const users = await JSONDb.getCollection<any>('users');
  // Find a user with this role, or fallback to the Guest/Visitor
  let user = users.find(u => u.role === role);
  if (!user && role === 'Visitor') {
    user = { id: '0', name: 'Guest', email: 'guest@example.com', role: 'Visitor', status: 'Active' };
  }

  if (!user) {
    return res.status(404).json({ error: `No user found for role: ${role}` });
  }

  res.json(user);
});

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = authHeader.split(' ')[1];
  if (userId === '0') {
    return res.json({ id: '0', name: 'Guest', email: 'guest@example.com', role: 'Visitor', status: 'Active' });
  }

  const users = await JSONDb.getCollection<any>('users');
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// Helper for making CRUD endpoints quickly
const createCRUDRoutes = (collectionName: string, pathName: string) => {
  // Get All
  app.get(`/api/${pathName}`, async (req, res) => {
    try {
      const items = await JSONDb.getCollection(collectionName);
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create
  app.post(`/api/${pathName}`, async (req, res) => {
    try {
      const payload = { ...req.body };
      if (collectionName === 'strategies') {
        payload.contentType = payload.contentType || 'Reel';
        payload.status = payload.status || 'Pending';
      }
      const newItem = await JSONDb.insert(collectionName, payload);
      res.status(201).json(newItem);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update
  app.put(`/api/${pathName}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await JSONDb.update(collectionName, id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete
  app.delete(`/api/${pathName}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await JSONDb.delete(collectionName, id);
      if (!success) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};

// Setup all CRUD resource collections
createCRUDRoutes('leads', 'leads');
createCRUDRoutes('campaigns', 'campaigns');
createCRUDRoutes('messages', 'messages');
createCRUDRoutes('budgetRequests', 'budget-requests');
createCRUDRoutes('platforms', 'platforms');
createCRUDRoutes('users', 'users');
createCRUDRoutes('posts', 'posts');
createCRUDRoutes('assets', 'assets');
createCRUDRoutes('strategies', 'strategies');
createCRUDRoutes('sales', 'sales');
createCRUDRoutes('reviews', 'reviews');

// Dashboard Stats Endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const leads = await JSONDb.getCollection<any>('leads');
    const campaigns = await JSONDb.getCollection<any>('campaigns');
    const budgetRequests = await JSONDb.getCollection<any>('budgetRequests');
    const sales = await JSONDb.getCollection<any>('sales');
    const revenueData = await JSONDb.getCollection<any>('revenueData');

    // Dynamically sum up sales to add to baseline YTD revenue
    const salesTotal = sales.reduce((sum, s) => sum + (s.revenue || 0), 0);
    const baselineYTD = 287500; // Original baseline from frontend static charts
    const ytdRevenueStr = `$${Math.round((baselineYTD + salesTotal) / 1000)}k`;

    res.json({
      activeLeads: leads.length,
      campaigns: campaigns.length,
      budgetRequests: budgetRequests.length,
      ytdRevenue: ytdRevenueStr,
      revenueData
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Revenue Data Endpoint
app.get('/api/revenue-data', async (req, res) => {
  try {
    const revenueData = await JSONDb.getCollection('revenueData');
    res.json(revenueData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`MarkAuto Backend running on port ${PORT}`);
  console.log(`=========================================`);
});
