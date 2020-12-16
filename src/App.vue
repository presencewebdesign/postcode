<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'PostCodeSearch' }">
        <v-icon large color="white darken-2">
          mdi-home
        </v-icon>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "./assets/scss/global";
</style>
