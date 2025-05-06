const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.text());

//Endpoint to receive and store logs
app.post('/log', (req, res) => {
    const logEntry = `${req.body}\n`;
    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.error('Fsoc Log write failed:', err);
            return res.status(500).send('Log write failed');
        }
        console.log('Fsoc Log received:', logEntry);
        res.status(200).send('Log received');
    });
});

// Endpoint to retrieve logs.txt
app.get('/logs', (req, res) => {
    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Fsoc Log read failed:', err);
            return res.status(404).send('Logs not found');
        }
        res.set('Content-Type', 'text/plain');
        res.status(200).send(data);
    });
});

//Root endpoint for verification
app.get('/', (req, res) => {
    res.send('Fsoc Server Running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
