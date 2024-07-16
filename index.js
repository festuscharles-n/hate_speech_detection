const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// The hate speech detection function
function detectHateSpeech(text) {
    const hateWords = ['hate', 'stupid', 'idiot', 'loser', 'jerk', 'moron'];
    const words = text.toLowerCase().split(/\s+/);
    return words.filter(word => hateWords.includes(word));
}

app.get('/', (req, res) => {
    res.render('index', { result: null });
}); 

app.post('/check', (req, res) => {
    const text = req.body.text; 
    const hateSpeech = detectHateSpeech(text); 
    res.render('index', { result: hateSpeech });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
}); 