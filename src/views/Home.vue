<template>
  <v-container grid-list-xl>
    <div class="text-right">
      <v-btn
        append-icon="mdi-chevron-right"
        to="/blogs"
        class="rounded-xl blue-grey darken-3 blue--text font-weight-black my-2"
      >
        See All Blogs
      </v-btn>
    </div>

    <v-layout justify-center wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="blog.id"
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
