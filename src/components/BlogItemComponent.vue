<template>
  <v-flex lg5 class="blue-grey darken-2 rounded-lg ma-3">
    <v-card class="pa-4 blue-grey ma-auto">
      <v-img
        :src="
          blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/300/300'
        "
        height="300px"
        class="blue--text ma-auto rounded-lg"
      >
        <v-card-title class="fill-height align-end">
          {{
            blog.title.length >= 20
              ? blog.title.substring(0, 20) + "..."
              : blog.title
          }}
        </v-card-title>
      </v-img>

      <v-card-actions class="my-4">
        <span>
          <v-btn color="primary" :to="`/blog/` + blog.id"> Read More </v-btn>
        </span>
        <v-spacer></v-spacer>
        <div v-if="token">
          <span>
            <v-btn @click="edit(blog)" color="yellow lighten-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="upload(blog)" color="blue" class="mx-2">
              <v-icon>mdi-upload</v-icon>
            </v-btn>
            <v-btn @click.stop="showDelete" color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </div>
      </v-card-actions>

      <Modal :id="blog.id" :visible="showModal" @close="closeDialog" />
      <Dialog :visible="showDialog" @close="closeDialog" />
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["blog"],
  components: {
    Modal: () => import("../components/Modal.vue"),
    Dialog: () => import("../components/Dialog.vue"),
  },

  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    showModal: false,
    buttonStatus: "login",
    showDialog: false,
  }),

  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },

  methods: {
    closeDialog() {
      this.showDialog = false;
      this.showModal = false;
    },
    showDelete() {
      this.showModal = true;
    },
    edit(blog) {
      let blogdata = {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        photo: blog.photo,
      };
      this.setDialogComponent({ component: "editblog" }),
        this.setBlogitem({ blogitem: blogdata });
    },
    upload(blog) {
      let data = {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        photo: blog.photo,
      };
      this.setDialogComponent({ component: "uploadphoto" }),
        this.setBlogitem({ blogitem: data });
    },
    ...mapActions({
      setDialogComponent: "dialog/setComponent",
      setId: "blogid/setId",
      setBlogitem: "blogid/setBlogitem",
    }),
  },
};
</script>
