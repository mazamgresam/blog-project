<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="submit"> Save </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list three-line subheader>
      <v-subheader>Form Data</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="title"
            :counter="30"
            label="Title"
            required
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list three-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-textarea
            counter
            v-model="description"
            label="Description"
          ></v-textarea>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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

    submit() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/blog/" + this.id + "?_method=PUT",
        headers: {
          Authorization: "Bearer " + this.token,
          Accept: "application/json",
        },
        data: formData,
      };

      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Edit Berhasil",
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
            text: "Edit Gagal",
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
