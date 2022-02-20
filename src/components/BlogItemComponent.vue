<template>
  <v-flex xs6>
    <v-card>
      <v-img
        :src="
          blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'
        "
        class="white--text"
        height="300px"
      >
        <v-card-title class="fill-height align-end"
          >{{ blog.title.substring(0, 30) }}...</v-card-title
        >
      </v-img>

      <v-card-actions>
        <span
          ><v-btn color="primary" :to="`/blog/` + blog.id"
            >Read More</v-btn
          ></span
        >
        <v-spacer></v-spacer>
        <Modal :id="blog.id" :visible="showModal" @close="showModal = false" />
        <div v-if="token">
          <span
            ><v-btn @click="edit(blog)" color="yellow lighten-2"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn @click="upload(blog)" color="blue"
              ><v-icon>mdi-upload</v-icon></v-btn
            >
            <v-btn color="red" @click.stop="showModal = true"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </span>
        </div>
      </v-card-actions>

      <Dialog :visible="showDialog" @close="showDialog = false" />
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    showModal: false,
    buttonStatus: "login",
    showDialog: false,
  }),
  components: {
    Modal: () => import("../components/Modal.vue"),
    Dialog: () => import("../components/Dialog.vue"),
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    edit(blog) {
      let blogdata = {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        photo: blog.photo,
      };
      this.setDialogComponent({ component: "editblog" }),
        //      this.setId({'id' : id}),
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
  props: ["blog"],
};
</script>
