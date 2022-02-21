<template>
  <v-container grid-list-xl>
    <div class="text-right">
      <v-btn
        text
        to="/blogs"
        class="rounded-xl blue-grey darken-3 blue--text font-weight-black"
      >
        See All Blogs <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-layout wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="`blog-${blog.id}`"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
  </v-container>
</template>

<script>
import BlogItemComponent from "../components/BlogItemComponent.vue";

export default {
  components: { "blog-item-component": BlogItemComponent },
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com/",
    blogs: [],
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      const config = {
        method: "get",
        url: `${this.apiDomain}api/v2/blog/random/4`,
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
