<template>
  <b-list-group>
    <b-list-group-item v-for="tweet in tweets" v-bind:key="tweet.screen_name">
      <tweet :tweet="tweet"></tweet>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import socket from "~/plugins/socket.io.js";
import Tweet from "~/components/Tweet.vue";
import moment from "moment";
export default {
  components: {
    Tweet
  },
  data() {
    return {
      tweets: []
    };
  },
  mounted: function() {
    socket.on(
      "tweet",
      function(msg) {
        console.log(msg);
        let tweet = JSON.parse(msg);
        tweet["created_at"] = moment(tweet["created_at"]).format(
          "DD-MM-YYYY hh:mm:ss"
        );
        this.tweets.unshift(tweet);
        if (this.tweets.length > 6) {
          this.tweets.pop();
        }
      }.bind(this)
    );
  }
};
</script>

<style>
</style>
