<template>
  <section class="properties-page">
    <div class="inner-bx scroll-section">
      <div class="page-inn">
        <div class="row">

           <!-- CARD 1ST -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card" @click="openSlide(1)">
              <div class="card-header p-3 pt-2">
                <div
                  class="
                    icon icon-lg icon-shape
                    bg-gradient-dark
                    shadow-dark
                    text-center
                    border-radius-xl
                    mt-n4
                    position-absolute
                  "
                >
                  <i class="material-icons opacity-10">weekend</i>
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Pending Meter Type</p>
                  <h4 class="mb-0">{{pendingMeter.total}}</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0" />
              <div class="card-footer p-3">
                <p class="mb-0">
                  <span class="text-success text-sm font-weight-bolder"
                    >+{{pendingMeter.perGrowth}}% </span
                  >than lask week
                </p>
              </div>
            </div>
          </div>

           <!-- CARD 2ND -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card" @click="openSlide(2)">
              <div class="card-header p-3 pt-2">
                <div
                  class="
                    icon icon-lg icon-shape
                    bg-gradient-primary
                    shadow-primary
                    text-center
                    border-radius-xl
                    mt-n4
                    position-absolute
                  "
                >
                  <i class="material-icons opacity-10">person</i>
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Today's Users</p>
                  <h4 class="mb-0">2,300</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0" />
              <div class="card-footer p-3">
                <p class="mb-0">
                  <span class="text-success text-sm font-weight-bolder"
                    >+3% </span
                  >than lask month
                </p>
              </div>
            </div>
          </div>

           <!-- CARD 3RD -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card" @click="openSlide(3)">
              <div class="card-header p-3 pt-2">
                <div
                  class="
                    icon icon-lg icon-shape
                    bg-gradient-success
                    shadow-success
                    text-center
                    border-radius-xl
                    mt-n4
                    position-absolute
                  "
                >
                  <i class="material-icons opacity-10">person</i>
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">New Clients</p>
                  <h4 class="mb-0">3,462</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0" />
              <div class="card-footer p-3">
                <p class="mb-0">
                  <span class="text-danger text-sm font-weight-bolder"
                    >-2%</span
                  >
                  than yesterday
                </p>
              </div>
            </div>
          </div>

           <!-- CARD 4TH -->
          <div class="col-xl-3 col-sm-6">
            <div class="card" @click="openSlide(4)">
              <div class="card-header p-3 pt-2">
                <div
                  class="
                    icon icon-lg icon-shape
                    bg-gradient-info
                    shadow-info
                    text-center
                    border-radius-xl
                    mt-n4
                    position-absolute
                  "
                >
                  <i class="material-icons opacity-10">weekend</i>
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Sales</p>
                  <h4 class="mb-0">$103,430</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0" />
              <div class="card-footer p-3">
                <p class="mb-0">
                  <span class="text-success text-sm font-weight-bolder"
                    >+5% </span
                  >than yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14468.024787266106!2d66.9868871!3d24.965903799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1633537774180!5m2!1sen!2s"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div> -->
      </div>

      <report-content  @meter_approved="meterApproved" @meter_delete="meterApproved"></report-content>

      <div class="row">
        <div class="col-lg-4 col-md-6 mt-4 mb-4">
          <div class="card-1 z-index-2">
            <div
              class="
                card-header
                p-0
                position-relative
                mt-n4
                mx-3
                z-index-2
                bg-transparent
              "
            >
              <div
                class="
                  chart-1
                  bg-gradient-primary
                  shadow-primary
                  border-radius-lg
                  py-3
                  pe-1
                "
              >
                <div class="chart">
                  <canvas
                    id="chart-bars"
                    class="chart-canvas"
                    height="170"
                  ></canvas>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="mb-0">Website Views</h6>
              <p class="text-sm">Last Campaign Performance</p>
              <hr class="dark horizontal" />
              <div class="d-flex">
                <i class="material-icons text-sm my-auto me-1">schedule</i>
                <p class="mb-0 text-sm">campaign sent 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 chart-container">
          <!-- <donut-chart
            v-if="loaded"
            :chart-data="chartdata.data"
            :options="chartdata.options"
          /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import { Doughnut, mixins } from "vue-chartjs";
export default {
  name: "ReportPageComponent",
  extends: BaseComponentVue,
  components: {
    Doughnut,
    mixins,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.emitEvent("selected_property", null);
    });
  },
  data() {
    return {
      loaded:true,
      property: null,
      step: 1,
      pendingMeter:{
        total: '',
        perGrowth:''
      }
    };
  },
 
  mounted() {
    this.pendingMeterCard();
  },

  methods:{
    openSlide(num) {
      this.step = num;
      this.emitEvent("openSlide", num);
    },
    async pendingMeterCard(){
      let res = await this.network().pendingMeterTypeCard();
      this.pendingMeter.total = res.total;
      this.pendingMeter.perGrowth = res.percentage_growth;
    },
    meterApproved(){
      this.pendingMeterCard();
    }
  }
};
</script>

<style scoped>
.icon-lg {
  width: 64px;
  height: 64px;
}
.icon-lg i {
  top: 31%;
  font-size: 1.5rem;
}
.icon-lg.icon-striped {
  background-position-x: 111px;
  background-position-y: 111px;
}
.icon-lg.icon-striped i {
  top: 21%;
  margin-left: -15px;
}
.bg-gradient-dark {
  background-image: linear-gradient(195deg, #42424a 0%, #191919 100%);
}
.bg-gradient-primary {
  background-image: linear-gradient(195deg, #ec407a 0%, #d81b60 100%);
}

.bg-gradient-secondary {
  background-image: linear-gradient(195deg, #747b8a 0%, #495361 100%);
}

.bg-gradient-success {
  background-image: linear-gradient(195deg, #66bb6a 0%, #43a047 100%);
}

.bg-gradient-info {
  background-image: linear-gradient(195deg, #49a3f1 0%, #1a73e8 100%);
}
.shadow-primary {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(233, 30, 99, 0.4) !important;
}

.shadow-secondary {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(210, 210, 210, 0.4) !important;
}

.shadow-info {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(0, 188, 212, 0.4) !important;
}
.shadow-success {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(76, 175, 80, 0.4) !important;
}
.shadow-dark {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(64, 64, 64, 0.4) !important;
}
.icon-shape {
  width: 48px;
  height: 48px;
  background-position: center;
  border-radius: 0.5rem;
  margin-top: -18px;
}
.icon-shape i {
  color: #fff;
  opacity: 0.8;
  top: 11px;
  position: relative;
}
.icon-shape-1 {
  width: 48px;
  height: 48px;
  float: right;
  border-radius: 0.5rem;
  margin-top: -18px;
}
.icon-shape-1 i {
  color: #fff;
  opacity: 0.8;
  top: 11px;
  position: relative;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
}
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: 10px;
}
.card[data-animation="true"] .card-header {
  transform: translate3d(0, 0, 0);
  transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1);
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
/* .card:hover[data-animation="true"] .card-header {
  transform: translate3d(0, -50px, 0);
} */
.card .card-header {
  padding: 1.5rem;
}
.card .card-body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  padding: 1.5rem;
}
.card.card-plain {
  background-color: transparent;
  box-shadow: none;
}
.card .card-footer {
  padding: 1.5rem;
  background-color: transparent;
}
.card-1 {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
}
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: 10px;
}
.card-1 {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: 10px;
}
.card-1 .card-header {
  padding: 1.5rem;
}
.card-1 .card-body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  padding: 1.5rem;
}
.card.card-plain {
  background-color: transparent;
  box-shadow: none;
}
.card-1 .card-footer {
  padding: 1.5rem;
  background-color: transparent;
}

.card-1 > hr {
  margin-right: 0;
  margin-left: 0;
}
.card-1 > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}
.card-1 > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
.card-1 > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}
.card-1 > .card-header + .list-group,
.card-1 > .list-group + .card-footer {
  border-top: 0;
}

.card > hr {
  margin-right: 0;
  margin-left: 0;
}
.card > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}
.card > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
.card > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}
.card > .card-header + .list-group,
.card > .list-group + .card-footer {
  border-top: 0;
}
.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
}
.card .card-body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  padding: 1.5rem !important;
}
.card-title {
  margin-bottom: 0.5rem;
}

.card-subtitle {
  margin-top: -0.25rem;
  margin-bottom: 0;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-link + .card-link {
  margin-left: 1rem;
}

.card-header {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 0 solid rgba(0, 0, 0, 0.125);
}
.card-header:first-child {
  border-radius: 0.75rem 0.75rem 0 0;
}

.card-footer {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-top: 0 solid rgba(0, 0, 0, 0.125);
}
.card-footer:last-child {
  border-radius: 0 0 0.75rem 0.75rem;
}

.card-header-tabs {
  margin-right: -0.5rem;
  margin-bottom: -0.5rem;
  margin-left: -0.5rem;
  border-bottom: 0;
}

.card-header-pills {
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}

.card-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  border-radius: 0.75rem;
}

.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
}

.card-img,
.card-img-top {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.card-img,
.card-img-bottom {
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}

.card-group > .card {
  margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
  .card-group {
    display: flex;
    flex-flow: row wrap;
  }
  .card-group > .card {
    flex: 1 0 0%;
    margin-bottom: 0;
  }
  .card-group > .card + .card {
    margin-left: 0;
    border-left: 0;
  }
  .card-group > .card:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-top,
  .card-group > .card:not(:last-child) .card-header {
    border-top-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-bottom,
  .card-group > .card:not(:last-child) .card-footer {
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-top,
  .card-group > .card:not(:first-child) .card-header {
    border-top-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-bottom,
  .card-group > .card:not(:first-child) .card-footer {
    border-bottom-left-radius: 0;
  }
}
.chart-1 {
  border-radius: 10px;
  margin-top: -18px;
}
@media (min-width: 992px) {
  .timeline:before {
    left: 50%;
    margin-left: -1px;
  }
  .timeline-step {
    left: 50%;
  }
  .timeline-content {
    width: 38%;
  }
  .timeline-block:nth-child(even) .timeline-content {
    float: right;
  }
}

.timeline-one-side:before {
  left: 1rem;
}

.timeline-one-side .timeline-step {
  left: 1rem;
}

.timeline-one-side .timeline-content {
  width: auto;
}

@media (min-width: 992px) {
  .timeline-one-side .timeline-content {
    max-width: 30rem;
  }
}

.timeline-one-side .timeline-block:nth-child(even) .timeline-content {
  float: none;
}

html * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-weight: 400;
  line-height: 1.6;
}

h1,
.h1,
.h1 {
  font-size: 3rem;
  line-height: 1.25;
  letter-spacing: 0;
}
@media (max-width: 575.98px) {
  h1,
  .h1,
  .h1 {
    font-size: calc(1.425rem + 2.1vw);
  }
}

h2,
.h2,
.h2 {
  font-size: 2.25rem;
  line-height: 1.3;
  letter-spacing: 0.05rem;
}
@media (max-width: 575.98px) {
  h2,
  .h2,
  .h2 {
    font-size: calc(1.35rem + 1.2vw);
  }
}

h3,
.h3,
.h3 {
  font-size: 1.875rem;
  line-height: 1.375;
}
@media (max-width: 575.98px) {
  h3,
  .h3,
  .h3 {
    font-size: calc(1.3125rem + 0.75vw);
  }
}

h4,
.h4,
.h4 {
  font-size: 1.5rem;
  line-height: 1.375;
}
@media (max-width: 575.98px) {
  h4,
  .h4,
  .h4 {
    font-size: calc(1.275rem + 0.3vw);
  }
}

h5,
.h5,
.h5 {
  font-size: 1.25rem;
  line-height: 1.375;
}
@media (max-width: 575.98px) {
  h5,
  .h5,
  .h5 {
    font-size: 1.25rem;
  }
}

h6,
.h6,
.h6 {
  font-size: 1rem;
  line-height: 1.625;
}

p,
.p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

.lead {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.625;
}

h1,
.h1,
.h1,
h2,
.h2,
.h2,
h3,
.h3,
.h3 {
  font-weight: 600;
  font-family: "Roboto Slab", sans-serif;
}

h4,
.h4,
.h4,
h5,
.h5,
.h5,
h6,
.h6,
.h6 {
  font-weight: 600;
}

h1,
.h1,
.h1,
h2,
.h2,
.h2,
h3,
.h3,
.h3,
h4,
.h4,
.h4 {
  letter-spacing: -0.05rem;
}

a {
  letter-spacing: 0rem;
  color: #344767;
}

.text-sm {
  line-height: 1.5;
}

.text-xs {
  line-height: 1.25;
}

p,
.p {
  font-size: 1rem;
}

.lead {
  font-size: 1.25rem;
}

.text-lg {
  font-size: 1.125rem !important;
}

.text-md {
  font-size: 1rem !important;
}

.text-sm {
  font-size: 0.875rem !important;
}

.text-xs {
  font-size: 0.75rem !important;
}

.text-xxs {
  font-size: 0.65rem !important;
}

p {
  line-height: 1.625;
  font-weight: 300;
}

.text-sans-serif {
  font-family: "Roboto", Helvetica, Arial, sans-serif !important;
}

.text-monospace {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace !important;
}

.text-justify {
  text-align: justify !important;
}

.text-wrap {
  white-space: normal !important;
}

.text-nowrap {
  white-space: nowrap !important;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.font-weight-light {
  font-weight: 300 !important;
}

.font-weight-lighter {
  font-weight: lighter !important;
}

.font-weight-normal {
  font-weight: 400 !important;
}

.font-weight-bold {
  font-weight: 600 !important;
}

.font-weight-bolder {
  font-weight: 700 !important;
}

.font-italic {
  font-style: italic !important;
}

.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
}
.text-gradient.text-primary {
  background-image: linear-gradient(195deg, #ec407a, #d81b60);
}
.text-gradient.text-info {
  background-image: linear-gradient(195deg, #49a3f1, #1a73e8);
}
.text-gradient.text-success {
  background-image: linear-gradient(195deg, #66bb6a, #43a047);
}
.text-gradient.text-warning {
  background-image: linear-gradient(195deg, #ffa726, #fb8c00);
}
.text-gradient.text-danger {
  background-image: linear-gradient(195deg, #ef5350, #e53935);
}
.text-gradient.text-dark {
  background-image: linear-gradient(195deg, #42424a, #191919);
}

.blockquote {
  border-left: 3px solid #6c757d;
}
.blockquote > span {
  font-style: italic;
}

.text-muted {
  color: #7b809a !important;
}

.text-black-50 {
  color: rgba(0, 0, 0, 0.5) !important;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.5) !important;
}

.text-decoration-none {
  text-decoration: none !important;
}

.text-break {
  word-wrap: break-word !important;
}

.text-reset {
  color: inherit !important;
}

.letter-wider {
  letter-spacing: 0.05rem;
}

.letter-normal {
  letter-spacing: 0rem;
}

.letter-tighter {
  letter-spacing: -0.05rem;
}

.text-lighter {
  font-weight: lighter;
}

.text-light {
  font-weight: 300;
}

.text-normal {
  font-weight: 400;
}

.text-bold {
  font-weight: 600;
}

.text-bolder {
  font-weight: 700;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2rem;
}

.text-5xl {
  font-size: 2.25rem;
}

.text-6xl {
  font-size: 3rem;
}

.text-7xl {
  font-size: 3.75rem;
}

.text-8xl {
  font-size: 4rem;
}

.text-9xl {
  font-size: 5rem;
}
</style>
