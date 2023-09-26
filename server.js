const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5500;


// Configure body-parser middleware

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname, 'public')));


// Store the scores in memory (replace with a database for a prodiction env)
let scores = [];


// HandlePOST request to store a new score

app.post('/scores', (req, res) => {
    console.log(req.body)

    const { name, score } = req.body;
    

    // Add the score to the scores array
    scores.push({ name, score });

    res.sendStatus(200);
});


// Handle GET request to retrieve scores
app.get('/scores', (req, res) => {
    console.log('hello get');
    res.json(scores);
});


// Start the server
app.listen(PORT, () => {

    console.log(`Server listening on port: ${PORT}`);
});