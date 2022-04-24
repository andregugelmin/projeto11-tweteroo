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

    if (!username || !avatar) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const checkUser = users.find((user) => user.username === username);
        if (checkUser) {
            res.status(400).send('User already exists');
        } else {
            users.push(req.body);
            console.log(
                chalk.bold.yellow(`User ${req.body.username} registered`)
            );
            res.status(201).send('OK');
        }
    }
});

app.post('/tweets', (req, res) => {
    const tweet = req.body.tweet;
    const username = req.headers.user;
    console.log(username);
    if (!username || !tweet) {
        res.status(400).send('Todos os campos são obrigatórios!');
        console.log(chalk.bold.yellow(`Error post tweets`));
    } else {
        let tweetUser = users.find((user) => user.username === username);
        const tweetPost = {
            username: username,
            avatar: tweetUser.avatar,
            tweet: tweet,
        };

        tweets.unshift(tweetPost);
        console.log(chalk.bold.yellow(`tweet posted ${tweetPost}`));
        res.status(201).send('OK');
    }
});

app.get('/tweets', (req, res) => {
    const page = parseInt(req.query.page);
    if (!page || page < 1) {
        res.status(400).send('Informe uma página válida!');
        console.log(chalk.bold.yellow(`Error get tweets`));
    } else {
        let i = 10 * (page - 1);
        const totalTweets = 10 * (page - 1) + 10;
        let showtweets = [];
        while (i < totalTweets && tweets[i] !== undefined) {
            showtweets.push(tweets[i]);
            i++;
            console.log(chalk.bold.red(`${i} ${tweets[i]}`));
        }
        console.log(chalk.bold.yellow(`tweets geted ${showtweets}`));
        res.send(showtweets);
    }
});

app.get('/tweets/:USERNAME', (req, res) => {
    const USERNAME = req.params.USERNAME;

    const userTweets = tweets.filter(
        (currentTweet) => USERNAME === currentTweet.username
    );

    res.send(userTweets);
});

app.listen(5000);
