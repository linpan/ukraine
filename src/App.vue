<template>
  <v-app class="tw-h-screen">
    <v-app-bar app flat color="#2C2C2C">
      <div class="d-flex align-center">
        <h3 class="tw-text-2xl tw-font-bold tw-text-white">
          数字人现场演播系统
          <span v-if="isConnected"
                class="tw-text-green-500 tw-text-xs tw-inline-flex tw-items-center tw-py-0.5 tw-rounded">
  <svg class="tw-mr-1 tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
    fill-rule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
    clip-rule="evenodd"></path></svg>
          connected
          </span>
        </h3>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="grey lighten-3 tw-h-full">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["isConnected"])
  }
};
</script>
