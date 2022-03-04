<template>
  <div class="tw-mt-2 tw-border-l tw-h-full">
    <v-card class="mx-5">
      <v-simple-table class="tw-bg-gray-500">
        <template v-slot:default>
          <thead class="qa-table">
            <tr>
              <th class="text-left">序</th>
              <th class="text-left">问题</th>
              <th class="text-left">答案</th>
              <th class="text-left col-1">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in desserts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.question }}</td>
              <td>
                {{ item.answer }}
              </td>
              <td>
                <v-btn text color="primary"> 播放</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "QA",
  data() {
    return {
      desserts: [],
    };
  },
  methods: {
    handleQa() {
      this.axios.get("/qa").then((res) => {
        this.desserts = res.data;
        console.log("deseerts.", this.desserts);
      });
    },
  },
  mounted() {
    this.handleQa();
  },
};
</script>

<style scoped></style>
