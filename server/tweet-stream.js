/**
 * File: tweet-stream.js
 * Project: mini-twitter
 * File Created: Thursday, 2nd May 2019 5:34:29 pm
 * Author: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Last Modified: Sunday, 5th May 2019 11:00:39 pm
 * Modified By: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Copyright 2016 - 2019 Socialanimal.com
 */
var Twit = require('twit')
var redis = require('redis')
var pub = redis.createClient();
var T = new Twit({
    consumer_key: 'qM8PgvvU64xxkGuOTlOGHsSL6',
    consumer_secret: 'W29xsHl3LdQnLuosxLYNmSC99LZrvNaVqdBTJHvWNzV2ougOeE',
    access_token: '14782853-kyvAObc8wCzf9Oue9NSY8W4X5HPDoQKCQx9BWrWJR',
    access_token_secret: 'MVXVXWf9Z9XKqeyRtYuqyDJrd3rGA8GcJkCFQWaG1VVoa',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.

})

var stream = T.stream('statuses/filter', {
    track: 'politics'
})

stream.on('tweet', function(tweet) {
    if (tweet.lang == 'en' && tweet.user.followers_count > 1000 && !tweet.quoted_status && !tweet.retweeted_status) {
        let tweetObject = {};
        tweetObject['text'] = tweet.text;
        tweetObject['name'] = tweet.user.name;
        tweetObject['screen_name'] = tweet.user.screen_name;
        tweetObject['profile_image_url_https'] = tweet.user.profile_image_url_https;
        tweetObject['created_at'] = tweet.created_at;
        console.log(tweetObject)
        pub.publish('tweets', JSON.stringify(tweetObject));

    }
})
