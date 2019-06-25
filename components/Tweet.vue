<template>
  <div style="max-width:540px">
    <b-row>
      <b-col cols="2">
        <b-img :src="tweet.profile_image_url_https" rounded="circle" class="mt-2 ml-2"></b-img>
      </b-col>
      <b-col cols="10">
        <div>
          <strong>{{tweet.name}}</strong>
          <span>@{{tweet.screen_name}}</span>
          <span class="created-date">{{tweet.created_at}}</span>
        </div>
        <p>{{tweet.text}}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["tweet"]
};
</script>

<style>
.created-date {
  float: right;
  font-size: 14px;
}
</style>
