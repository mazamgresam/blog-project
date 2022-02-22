<template>
  <div class="pa-10">
    <v-card class="ma-auto" width="70%" v-if="blog.id">
      <v-img
        :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/700'"
      ></v-img>

      <v-card-text class="font-weight-bold blue-grey darken-2">
        <v-simple-table class="blue-grey lighten-3">
          <tbody>
            <tr>
              <td><v-icon>mdi-format-title</v-icon> Title</td>
              <td class="blue--text">{{ blog.title }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-note</v-icon> Description</td>
              <td>{{ blog.description }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com/",
    blog: {},
  }),

  methods: {
    go() {
      let { id } = this.$route.params;
      const config = {
        method: "get",
        url: `${this.apiDomain}api/v2/blog/${id}`,
      };

      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          this.blog = blog;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.go();
  },
};
</script>
