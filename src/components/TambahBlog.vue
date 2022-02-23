<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Add new blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="submit"> Add Blog </v-btn>
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
      title: "",
      description: "",
      photo_profile: null,
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  computed: {
    ...mapGetters({
      token: "auth/token",
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
        url: `${this.apiDomain}/api/v2/blog`,
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
            text: "Berhasil Menambahkan File Baru",
          });
          this.clear();
          this.$router.go(0);
          this.close();
        })
        .catch((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "error",
            text: "Gagal Menambahkan File Baru",
          });
        });
    },
    close() {
      this.$emit("closed");
    },
    clear() {
      (this.title = ""), (this.description = ""), (this.photo_profile = "");
    },
  },
};
</script>
