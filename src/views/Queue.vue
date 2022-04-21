<template>
  <div class="flex">
    <!-- <h1 class="halo">HALO</h1> -->
    <!-- <div v-for="q in queue" :key="q.id">{{ q.nama }}</div> -->
    <!-- <table>
      <thead>
        <tr class="bg-blue-900 text-white text-left">
          <th>Floor</th>
          <th>Name</th>
          <th>Schedule</th>
          <th>Queue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="q in queue" :key="q.id">
          <td>{{ q.room.floor }}F</td>
          <td>{{ q.nama }}</td>
          <td>{{ q.jadwal.jamMulai }} - {{ q.jadwal.jamSelesai }}</td>
          <td>{{ q.queueNoFormatted }}</td>
        </tr>
      </tbody>
    </table> -->
    <div style="width: 50%">
      <vue-good-table
        :class="transition ? 'element' : ''"
        :columns="columns"
        :rows="queue"
        :sort-options="{
          enabled: false,
        }"
        :group-options="{
          enabled: true,
        }"
      />
    </div>
    <div style="width: 50%">
      <vue-good-table
        :class="transition ? 'element' : ''"
        :columns="columns"
        :rows="queue2"
        :sort-options="{
          enabled: false,
        }"
        :group-options="{
          enabled: true,
        }"
      />
    </div>
    <footer-q></footer-q>
    <progress-bar />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FooterQ from "../components/FooterQueue.vue";
import ProgressBar from "../components/ProgressBar.vue";
export default {
  name: "Queue",
  components: {
    FooterQ,
    ProgressBar,
  },
  computed: {
    ...mapState({
      queue: (state) => state.queue,
      queue2: (state) => state.queue2,
      totalItem: (state) => state.totalItem,
      totalPage: (state) => state.totalPage,
      lastItem: (state) => state.lastItem,
      transition: (state) => state.transition,
    }),
  },
  methods: {
    ...mapActions(["getQueueData"]),
    ...mapMutations([
      "SET_QUEUE",
      "SET_QUEUE2",
      "SET_TRANSITION",
      "SET_LOAD_START",
    ]),
    schedule(rowObj) {
      return `${rowObj.jadwal.jamMulai} - ${rowObj.jadwal.jamSelesai}`;
    },
  },
  mounted() {
    this.getQueueData();
    this.SET_LOAD_START(true);
    setInterval(() => {
      // this.SET_TRANSITION(true);
      // setTimeout(() => {

      this.SET_QUEUE();
      this.SET_QUEUE2();
      const text = document.getElementsByClassName("vgt-text-disabled");
      // this.SET_TRANSITION(false);
      // }, 5000);
      // console.log(text);
      if (text.length > 0) {
        text[0].innerText = "Loading...";
      }
    }, 10000);
  },
  data() {
    return {
      columns: [
        {
          label: "Floor",
          field: "room.floor",
          thClass: "custom-th-class",
        },
        {
          label: "Name",
          field: "nama",
          thClass: "custom-th-class",
        },
        {
          label: "Schedule",
          type: "String",
          field: this.schedule,
          thClass: "custom-th-class",
        },
        {
          label: "Queue",
          field: "queueNoFormatted",
          thClass: "custom-th-class",
        },
      ],
    };
  },
};
</script>

<style>
.custom-th-class {
  background: #0c2041 !important;
  color: white !important;
  font-weight: bold;
  border-color: #0c2041 !important;
}

.vgt-row-header {
  background-color: #07466f !important;
  color: white;
}
</style>
