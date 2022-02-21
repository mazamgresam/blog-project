<template>
  <v-app>
    <Alert />
    <Dialog />
    <v-navigation-drawer class="blue-grey darken-1" app v-model="drawer">
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img
              :src="
                user.photo_profile
                  ? apiDomain + user.photo_profile
                  : 'https://randomuser.me/api/portraits/men/70.jpg'
              "
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-if="guest">
          <v-btn block color="success" class="mb-1" @click="login">
            <v-icon left>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="warning" @click="register">
            <v-icon left>mdi-account</v-icon>
            Register
          </v-btn>
        </div>

        <v-divider></v-divider>

        <v-list-item
          class="font-weight-medium"
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="blue-grey darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="blue--text font-weight-bold"
        >Blog Project</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="blue-grey darken-1">
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer class="flex-column blue-grey darken-3">
      <v-card-title>
        <a
          class="text-decoration-none"
          v-for="connect in connects"
          :key="connect.icon"
          :href="connect.link"
        >
          <v-btn class="mx-4" dark icon>
            <v-icon size="32px">
              {{ connect.icon }}
            </v-icon>
          </v-btn>
        </a>
      </v-card-title>
      <v-card-text class="blue--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>M. Azam Gresa Mahendra</strong>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert.vue"),
    Dialog: () => import("./components/Dialog.vue"),
  },

  data: () => ({
    drawer: false,
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Blogs", icon: "mdi-note", route: "/blogs" },
      { title: "About", icon: "mdi-account", route: "/about" },
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    connects: [
      { link: "https://www.facebook.com/shaolinzam", icon: "mdi-facebook" },
      { link: "https://github.com/mazamgresam", icon: "mdi-github" },
      {
        link: "https://www.linkedin.com/in/m-azam-gresa-mahendra-681204217/",
        icon: "mdi-linkedin",
      },
      { link: "https://www.instagram.com/mazadram/", icon: "mdi-instagram" },
    ],
  }),

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  methods: {
    ...mapMutations({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),

    logout() {
      let config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/auth/logout`,
        headers: {
          Authorization: "Bearer" + this.token,
        },
      };
      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil logout",
          });
        })
        .catch((responses) => {
          this.setAlert({
            status: true,
            color: "error",
            text: responses.data.error,
          });
        });
    },

    login() {
      this.setDialogComponent({ component: "login" });
    },

    register() {
      this.setDialogComponent({ component: "register" });
    },

    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
      checkToken: "auth/checkToken",
    }),
  },

  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
};
</script>
