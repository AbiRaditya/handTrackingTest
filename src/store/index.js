import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allData: [],
    queue: [],
    queue2: [],
    currentPage: 1,
    totalPage: null,
    totalItem: null,
    lastItem: null,
    itemPerTable: 10,
    pagination: false,
    transition: false,
    loadStart: false,
  },
  mutations: {
    SET_QUEUE(state) {
      let labels = [];
      let data = [];
      let objTemplate = {};
      let count = 0;
      let currentIndex;
      state.allData.forEach((item, index) => {
        if (item.number == state.lastItem) {
          currentIndex = index;
        }
      });
      let slicedData = state.allData.slice(state.lastItem ? currentIndex : 0);
      let useData =
        state.lastItem == state.totalItem
          ? state.allData
          : state.pagination
          ? slicedData
          : state.allData;
      console.log("totalItem dan lastItem", state.totalItem, state.lastItem);
      console.log(
        useData,
        useData.length,
        "useData",
        state.lastItem,
        currentIndex
      );
      // console.log(res.page);
      // console.log(state.allData, "allData");
      useData.forEach((item) => {
        labels.push(item.tujuanRujukan.nama);
      });
      let uniq = (a) => [...new Set(a)];
      labels = uniq(labels);
      // console.log(labels);
      let nomor = null;
      labels.forEach((item) => {
        useData.forEach((el) => {
          if (el.tujuanRujukan.nama === item) {
            if (objTemplate.label == item) {
              // console.log(objTemplate.label == item, item);
              if (count < state.itemPerTable) {
                nomor = el.number;
                // console.log(index, "index");
                objTemplate.children.push(el);
                count++;
              }
            } else {
              // console.log(count == state.itemPerTable - 2, "boolena");

              objTemplate = {
                label: item,
                children: [el],
                mode: "span",
                html: false,
              };
              nomor = el.number;
              if (count == state.itemPerTable - 2) {
                // console.log(count, "count atas");
                data.push(objTemplate);

                // console.log(index, "index");
              }
              count += 2;
            }
          }
        });
        if (count <= state.itemPerTable) {
          // console.log(count, "count bawah");
          // console.log(count, objTemplate, "count");
          data.push(objTemplate);
          state.lastItem = nomor;
          // console.log(nomor, "nomor", data);
        }
        // console.log(count, "count 71");
        objTemplate = {};
      });
      // this.commit("SET_TOTAL_ITEM", count);
      // this.commit("SET_TOTAL_PAGE", Math.ceil(count / state.itemPerTable));
      state.queue = data;
    },
    SET_QUEUE2(state, res) {
      let labels = [];
      let data = [];
      let objTemplate = {};
      let count = 0;
      // console.log(res);
      // console.log(res);
      let currentIndex;
      state.allData.forEach((element, index) => {
        if (element.number == state.lastItem) {
          currentIndex = index;
        }
      });
      res = state.allData.slice(currentIndex + 1);
      // console.log(res);
      res.forEach((item) => {
        labels.push(item.tujuanRujukan.nama);
      });
      let nomor = null;
      let uniq = (a) => [...new Set(a)];
      labels = uniq(labels);
      labels.forEach((item) => {
        res.forEach((el) => {
          if (el.tujuanRujukan.nama === item) {
            if (objTemplate.label == item) {
              if (count < state.itemPerTable) {
                nomor = el.number;
                objTemplate.children.push(el);
                count++;
              }
            } else {
              objTemplate = {
                label: item,
                children: [el],
                mode: "span",
                html: false,
              };
              nomor = el.number;
              if (count == state.itemPerTable - 2) {
                data.push(objTemplate);
              }
              count += 2;
            }
          }
        });
        if (count <= state.itemPerTable) {
          state.lastItem = nomor;
          data.push(objTemplate);
        }
        objTemplate = {};
      });
      // console.log("halo");
      // console.log(data);
      state.queue2 = data;
    },
    SET_TOTAL_PAGE(state, res) {
      state.totalPage = res;
    },
    SET_TOTAL_ITEM(state, res) {
      state.totalItem = res;
    },
    SET_ALL_DATA(state, res) {
      state.allData = res;
    },
    SET_PAGINATION(state, res) {
      state.pagination = res;
    },
    SET_TRANSITION(state, res) {
      state.transition = res;
    },
    SET_LOAD_START(state, res) {
      state.loadStart = res;
    },
  },
  actions: {
    getQueueData({ commit, state }) {
      const data = [
        {
          id: 21,
          nama: "Second Impression 2",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 22,
          nama: "Second Impression 3",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 3,
          nama: "Third Impression",
          tujuanRujukan: {
            nama: "Kejiwaan",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 4,
          nama: "Fourth Impression",
          tujuanRujukan: {
            nama: "Radiology",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 1,
          nama: "First Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 2,
          nama: "Second Impression 1",
          tujuanRujukan: {
            nama: "Jantung 2",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 21,
          nama: "Second Impression 2",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 22,
          nama: "Second Impression 3",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 3,
          nama: "Third Impression",
          tujuanRujukan: {
            nama: "Kejiwaan",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 4,
          nama: "Fourth Impression",
          tujuanRujukan: {
            nama: "Radiology",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 1,
          nama: "First Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 2,
          nama: "Second Impression 1",
          tujuanRujukan: {
            nama: "Jantung 2",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 21,
          nama: "Second Impression 2",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 22,
          nama: "Second Impression 3",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 3,
          nama: "Third Impression",
          tujuanRujukan: {
            nama: "Kejiwaan",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 4,
          nama: "Fourth Impression",
          tujuanRujukan: {
            nama: "Radiology",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 5,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 7,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Asthma Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 1,
          nama: "First Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 2,
          nama: "Second Impression 4",
          tujuanRujukan: {
            nama: "Jantung 2",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 21,
          nama: "Second Impression 5",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 22,
          nama: "Second Impression 6",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 3,
          nama: "Third Impression",
          tujuanRujukan: {
            nama: "Kejiwaan",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 4,
          nama: "Fourth Impression",
          tujuanRujukan: {
            nama: "Radiology",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 5,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 7,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Asthma Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 1,
          nama: "First Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 2,
          nama: "Second Impression asd",
          tujuanRujukan: {
            nama: "Jantung 2",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 21,
          nama: "Second Impression 7",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 22,
          nama: "Second Impression 8",
          tujuanRujukan: {
            nama: "Jantung",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 3,
          nama: "Third Impression",
          tujuanRujukan: {
            nama: "Kejiwaan",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 4,
          nama: "Fourth Impression",
          tujuanRujukan: {
            nama: "Radiology",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 5,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
        {
          id: 7,
          nama: "Fifth Impression",
          tujuanRujukan: {
            nama: "Asthma Rawat Test",
          },
          jadwal: {
            jamMulai: "08:00",
            jamSelesai: "10:00",
          },
          room: {
            name: "Bone Denistometry",
            floor: "1",
          },
          queueNoFormatted: "W0001",
        },
      ];
      // commit("SET_TOTAL_PAGE", Math.ceil(data.length / 7));
      // commit("SET_TOTAL_ITEM", data.length);
      // console.log(data);
      data.sort(
        (a, b) => (a.tujuanRujukan.nama > b.tujuanRujukan.nama && 1) || -1
      );
      data.forEach((item, index) => {
        item.number = index + 1;
      });
      // console.log(data);
      const pagination = {
        page: 1,
      };
      commit("SET_ALL_DATA", data);
      commit("SET_QUEUE", pagination);
      commit("SET_QUEUE2", pagination);
      commit("SET_TOTAL_PAGE", Math.ceil(data.length / state.itemPerTable));
      commit("SET_TOTAL_ITEM", data.length);
      commit("SET_PAGINATION", true);
    },
  },
  modules: {},
});
