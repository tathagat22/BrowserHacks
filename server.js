const express = require('express');
const cors = require('cors');
const app = express();

// In-memory store for logs
const logs = [];

// Middleware
app.use(cors());
app.use(express.text()); // Parse text/plain for POST /log

// Root endpoint
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Log retrieval endpoint
app.get('/logs', (req, res) => {
    res.json(logs);
});

// Log submission endpoint for SHADOWGRID exploits
app.post('/log', (req, res) => {
    const logEntry = req.body;
    if (logEntry) {
        logs.push({ timestamp: new Date().toISOString(), data: logEntry });
        console.log('Received log:', logEntry);
        res.status(200).send('Log received');
    } else {
        res.status(400).send('Invalid log entry');
    }
});

// Start server on Render-assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
