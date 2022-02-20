<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="380" :retain-focus="false">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure want to delete?
        </v-card-title>
        <v-card-text>Your data will deleted permanently. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.native="close">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="hapus"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  props: ["visible", "id"],
  computed: {
    dialog: {
      get() {
        return this.visible;
      },
    },
    ...mapGetters({
      token: "auth/token",
    }),
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),

    hapus() {
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/blog/" + this.id + "?_method=DELETE",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };

      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Delete Berhasil",
          });
          this.$router.go(0);
          this.close();
        })
        .catch((response) => {
          console.log(response);

          this.setAlert({
            status: true,
            color: "error",
            text: "Delete Gagal",
          });
        });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
