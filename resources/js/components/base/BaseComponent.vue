
<script>
// import VEasyDialog from 'v-easy-dialog'
import NetworkService from "../../services/network.service";
import SqliteService from "../../services/sqlite.service";
import UtilityService from "../../services/utility.service";

const networkService = new NetworkService();
const sqliteService = new SqliteService();
const utilityService = new UtilityService();

// import { EventBus } from "./event-bus.js";

import Vue from 'vue';
export const EventBus = new Vue();

export default {
  name: "BaseComponent",
  // components: {
  //     VEasyDialog
  // },
  data() {},
  methods: {
    network() {
      return networkService;
    },
    sqlite() {
      return sqliteService;
    },
    utility() {
      return utilityService;
    },
    route(path, query = {}) {
      return this.$router.push({ path: path, query: query });
    },

    eventbus() {
      return EventBus;
    },
    emitEvent(event, data) {
      return EventBus.$emit(event, data);
    },
  },
  mounted() {
    this.eventbus();
  },
};
</script>
