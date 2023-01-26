const fs = require("fs");

export default function handler(req, res) {
  const tweetId = req.query.id;

  const tweets = require("../../public/tweets.json");

  const tweet = tweets.find((tweet) => tweet.id === parseInt(tweetId));
  tweet.likes += 1;
  tweet.liked = true;

  fs.writeFileSync(
    "./public/tweets.json",
    JSON.stringify(tweets, null, 2),
    "utf-8"
  );

  return res.status(200).json(tweet);
}
