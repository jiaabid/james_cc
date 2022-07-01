import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    // this.eventbus().$on("selected_chart", (item) => {
    //   this.chartData = item;
    // });
    this.renderChart(this.chartData, this.options)
  }
}