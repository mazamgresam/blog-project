<template>
  <v-card>
    <v-toolbar dark color="warning">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Form Register</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form">
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-file-input
          v-model="photo_profile"
          prepend-icon="mdi-camera"
          label="Photo"
          required
        ></v-file-input>
        <div class="text-xs-center">
          <v-btn color="warning lighten-1" @click="register"> Register </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      showPassword: false,
      password: "",
      name: "",
      photo_profile: null,
      apiDomain: "https://demo-api-vue.sanbercloud.com/",
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),

    close() {
      this.$emit("closed", false);
    },
    clear() {
      (this.email = ""), (this.password = ""), (this.name = "");
    },

    register() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("photo_profile", this.photo_profile);
      const config = {
        method: "post",
        url: this.apiDomain + "api/v2/auth/register",
        headers: {
          Accept: "application/json",
        },
        data: formData,
      };
      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Register Berhasil",
          });
          this.clear();
          this.close();
        })
        .catch((response) => {
          console.log(response);

          this.setAlert({
            status: true,
            color: "error",
            text: "Register Gagal",
          });
        });
    },
  },
};
</script>
