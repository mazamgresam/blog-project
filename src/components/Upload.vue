<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Upload Photo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="uploadPhoto"> Save </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list three-line subheader>
      <v-subheader>Form Data</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-file-input
            v-model="photo"
            prepend-icon="mdi-camera"
            label="File input"
          ></v-file-input>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list three-line subheader> </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      title: "",
      description: "",
      photo: null,
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  computed: {
    ...mapGetters({
      token: "auth/token",
      blogitem: "blogid/blogitem",
    }),
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),

    uploadPhoto() {
      let formData = new FormData();
      formData.append("photo", this.photo);
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/blog/" + this.id + "/upload-photo",
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Upload Berhasil",
          });
          this.clear();
          this.close();
          this.$router.go();
        })
        .catch((response) => {
          console.log(response);

          this.setAlert({
            status: true,
            color: "error",
            text: "Upload Gagal",
          });
        });
    },
    close() {
      this.$emit("closed");
    },

    clear() {
      (this.title = ""), (this.description = ""), (this.photo = null);
    },
  },

  created() {
    (this.id = this.blogitem.blogitem.id),
      (this.title = this.blogitem.blogitem.title),
      (this.description = this.blogitem.blogitem.description);
  },
};
</script>
