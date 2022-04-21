import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    const user = {
        username: username,
        avatar: avatar,
    };

    users.push(user);
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    let tweetUser = users.find((user) => user.username === username);
    const tweetPost = {
        username: username,
        avatar: tweetUser.avatar,
        tweet: tweet,
    };

    tweets.unshift(tweetPost);

    res.send('OK');
});

app.get('/tweets', (req, res) => {
    const totalTweets = tweets.length > 10 ? 10 : tweets.length;
    let lastsTweets = [];
    for (let i = 0; i < totalTweets; i++) {
        lastsTweets.push(tweets[i]);
    }
    res.send(lastsTweets);
});

app.listen(5000);
