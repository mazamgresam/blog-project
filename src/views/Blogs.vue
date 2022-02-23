<template>
  <v-container grid-list-xl>
    <div class="text-right" v-if="token">
      <v-btn color="success" @click="addNew"
        ><v-icon left>mdi-plus</v-icon>Add New</v-btn
      >
    </div>

    <v-layout justify-center wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="`blog` + blog.id"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
    <v-pagination
      v-model="page"
      @input="go"
      :length="lengthPage"
      :total-visible="5"
    >
    </v-pagination>

    <Dialog :visible="showDialog" @close="showDialog = false" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BlogItemComponent: () => import("../components/BlogItemComponent.vue"),
    Dialog: () => import("../components/Dialog.vue"),
  },
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
    page: 0,
    lengthPage: 0,
    perPage: 0,
    showDialog: false,
    buttonStatus: "login",
  }),

  computed: {
    ...mapGetters({
      token: "auth/token",
      guest: "auth/guest",
      user: "auth/user",
    }),
  },

  methods: {
    go() {
      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog?page="${this.page}`,
        params: { page: this.page },
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs.data;
          this.page = blogs.current_page;
          this.lengthPage = blogs.last_page;
          this.perPage = blogs.per_page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addNew() {
      this.setDialogComponent({ component: "tambahblog" });
    },
    ...mapActions({
      setDialogComponent: "dialog/setComponent",
    }),
  },

  created() {
    this.go();
  },
};
</script>
