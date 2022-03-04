<template>
  <v-row justify="center" class="fill-height">
    <v-col cols="5" class="tw-h-full">
        <chat-bot></chat-bot>
    </v-col>
    <v-col cols="7">
      <q-a></q-a>
    </v-col>
  </v-row>
</template>

<script>
import ChatBot from "@/components/ChatBot";
import QA from "@/components/QA";

export default {
  name: "Home",
  components: { QA, ChatBot },
};
</script>
