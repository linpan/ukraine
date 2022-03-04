<template>
  <div
    class="tw-flex tw-overflow-y-hidden tw-flex-col py-0 tw-h-full tw-border-l-2 tw-border-gray-50 tw-px-4 tw-justify-between  tw-overflow-y-auto"
  >
    <div ref="webbox" class="tw-overflow-y-auto tw-grow message-body mx-4 tw-h-full tw-mt-4">
      <div class="flex-grow-1 mb-6" v-for="(utt, index) of message" :key="index">
        <v-row no-gutters class="justify-start" v-if="!utt.bot">
          <div class="tw-w-16 tw-h-16">
            <v-img
              src="../assets/img.png"
              width="48"
              aspect-ratio="1"
              class="tw-rounded-full"
            ></v-img>
          </div>
          <v-col cols="6" class="tw-flex tw-items-center tw-relative">
            <div>
              <div class="left-arrow rounded-lg pa-4">{{ utt.message }}</div>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="justify-end" v-else>
          <v-col cols="1" order="2">
            <v-img
              src="../assets/hum_r.jpg"
              width="48"
              aspect-ratio="1"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="6" order="1" class="rounded-lg">
            <div class="d-flex justify-end mr-3">
              <div class="tw-flex tw-flex-col">
                <div class="text-left right-arrow rounded-lg">
                  {{ utt.message }}
                </div>
                <div
                  class="tw-text-right tw-pt-1 tw-inline-flex tw-justify-end tw-space-x-3.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="tw-h-7 tw-w-7 tw-text-blue-400 hover:tw-text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    @click=updateBot(utt,index)
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="tw-h-7 tw-w-7 tw-text-blue-400 hover:tw-text-blue-600 tw-transform tw-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="tw-h-16 mb-0 tw-flex tw-border-1 tw-shadow">
      <div
        class="write tw-bg-white tw-shadow tw-flex tw-rounded-lg tw-w-full tw-items-center"
      >
        <div
          class="tw-flex tw-content-center tw-items-center tw-text-center tw-p-4 tw-pr-0"
        >
          <span
            class="tw-block tw-text-center tw-text-gray-400 hover:tw-text-gray-800"
          >
            <svg
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              class="tw-h-6 tw-w-6"
            >
              <path
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </span>
        </div>
        <div class="flex-1 tw-w-full tw-items-center tw-p-3">
          <input
            type="text"
            placeholder="对话..."
            class="tw-w-full tw-py-3 focus:tw-outline-none focus:tw-placeholder-gray-400 tw-text-lg tw-font-medium tw-text-gray-600"
          />
        </div>
        <div class="flex pa-2">
          <button class="tw-w-12 tw-h-12 tw-rounded-full tw-inline-block">
            <span class="tw-inline-block tw-align-text-bottom">
              <svg
                class="tw-h-10 tw-w-10 tw-text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

let sseClient;
export default {
  name: "ChatBot",
  computed: {
    ...mapGetters(["isConnected"])
  },
  data() {
    return {
      message: [{ "bot": 0, "message": "你好啊呀" }]
    };
  },
  mounted() {
    sseClient = this.$sse.create({
      url: "http://localhost:8005/status/stream",
      format: "json",
      withCredentials: true,
      polyfill: true
    });
    sseClient.connect().then((sse) => {
      console.log("We're connected!", sse);
      this.activeConnect(true);
    });
    sseClient.on('error', (e) => {
      console.error('lost connection or failed to parse!', e);
      this.activeConnect(false)
    });
    sseClient.on("message", this.handleMessage);

  },
  methods: {
    ...mapActions(["activeConnect"]),
    handleMessage(message) {
      this.message.push(message);
      this.handleResponse();
    },
    updateTick() {
      this.$nextTick(() => {
        const container = this.$refs.webbox;
        container.scrollTop = container.scrollHeight;
      });
    },

    handleResponse() {
      this.axios.post("/bot", { query: "钢铁侠" }).then(res => {
        this.message.push({ "bot": 1, "message": res.data });
        this.updateTick();
      });
    },
    updateBot(utt, index){
      let human = this.message[index-1]
      this.axios.post("/bot", {query: human.message}).then(res=>{
        console.log(human.message, 'olr');
        this.message[index] ={ "bot": 1, "message": res.data };
      })
    }
  },
  beforeDestroy() {
    sseClient.disconnect();
    console.log("disconnect Server-Sent Events");
  }
};
</script>

<style scoped>
.left-arrow {
  display: inline-block;
  position: relative;
  background: #e5e7eb;
  padding: 15px;
}

.left-arrow:after {
  content: "";
  display: block;
  position: absolute;
  right: 100%;
  top: 10%;
  margin-top: 14px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 5px solid #e5e7eb;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
}

.right-arrow {
  display: inline-block;
  position: relative;
  background: #93d154;
  padding: 15px;
}

.right-arrow:after {
  content: "";
  display: block;
  position: absolute;
  left: 100%;
  top: 20px;
  margin-top: -10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #93d154;
}

::-webkit-scrollbar {
  display: none;
}
</style>
