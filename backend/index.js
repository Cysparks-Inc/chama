const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const uri = "mongodb+srv://Samuel:Ffre4Mi0j2dHmt1z@cluster0.edl745m.mongodb.net/chama?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("chama");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// API Routes
app.get('/api/dashboard', async (req, res) => {
  try {
    const db = await connectDB();
    
    // Get total members
    const totalMembers = await db.collection('users').countDocuments({ role: 'member' });
    
    // Get total savings
    const savingsAgg = await db.collection('savings').aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]).toArray();
    
    // Get active loans
    const activeLoans = await db.collection('loans').countDocuments({ status: 'approved' });
    
    // Get recent transactions
    const recentTransactions = await db.collection('transactions')
      .find()
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    // Get savings trend
    const savingsTrend = await db.collection('savings').aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    res.json({
      totalMembers,
      totalSavings: savingsAgg[0]?.total || 0,
      activeLoans,
      recentTransactions,
      savingsTrend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Members endpoints
app.post('/api/members', async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('users').insertOne({
      ...req.body,
      joinedDate: new Date(),
      contributionsTotal: 0,
      role: 'member'
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    const db = await connectDB();
    const members = await db.collection('users').find({ role: 'member' }).toArray();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Savings endpoints
app.post('/api/savings', async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('savings').insertOne({
      ...req.body,
      date: new Date(),
      memberId: new ObjectId(req.body.memberId)
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Loans endpoints
app.post('/api/loans', async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('loans').insertOne({
      ...req.body,
      dateIssued: new Date(),
      status: 'pending',
      memberId: new ObjectId(req.body.memberId)
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transactions endpoints
app.post('/api/transactions', async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('transactions').insertOne({
      ...req.body,
      date: new Date(),
      memberId: new ObjectId(req.body.memberId)
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Projects endpoints
app.post('/api/projects', async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('projects').insertOne({
      ...req.body,
      startDate: new Date(),
      status: 'planning',
      members: req.body.members.map(id => new ObjectId(id))
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});