<template>
  <keep-alive>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
      :retain-focus="false"
    >
      <component :is="currentComponent" @closed="setDialogStatus"></component>
    </v-dialog>
  </keep-alive>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Login: () => import("./Login.vue"),
    Register: () => import("./Register.vue"),
    Tambahblog: () => import("./TambahBlog.vue"),
    Editblog: () => import("./EditBlog.vue"),
    Uploadphoto: () => import("./Upload.vue"),
  },

  computed: {
    ...mapGetters({
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component",
    }),
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      },
    },
  },

  methods: {
    ...mapActions({
      setDialogStatus: "dialog/setStatus",
    }),
  },
};
</script>
