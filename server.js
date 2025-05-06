const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// DEATHCODEX: Middleware to parse text/plain body
app.use(express.text());

// DEATHCODEX: Endpoint to receive and store logs
app.post('/log', (req, res) => {
    const logEntry = `${req.body}\n`;
    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.error('DEATHCODEX: Log write failed:', err);
            return res.status(500).send('Log write failed');
        }
        console.log('DEATHCODEX: Log received:', logEntry);
        res.status(200).send('Log received');
    });
});

// DEATHCODEX: Root endpoint for verification
app.get('/', (req, res) => {
    res.send('DEATHCODEX Server Running');
});

// DEATHCODEX: Start the server
app.listen(port, () => {
    console.log(`DEATHCODEX: Server running on port ${port}`);
});