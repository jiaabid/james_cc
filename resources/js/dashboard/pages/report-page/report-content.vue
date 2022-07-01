<template>
  <div class="row mb-2">
    <!----------------SlideS-------------------->
    <div
      class="col-lg-8 col-md-6 mb-md-0 mb-1"
      v-for="item in cardList"
      :key="item.id"
      v-show="step == item.id"
    >
      <div class="card-1" style="height: 55vh">
        <div class="card-header pb-0">
          <div class="row">
            <div class="col-lg-6 col-7">
              <h6>{{ item.name }}</h6>
              <!-- <p class="text-sm mb-0">
                <i class="fa fa-check text-info" aria-hidden="true"></i>
                <span class="font-weight-bold ms-1">30 done</span> this month
              </p> -->
            </div>
            <div class="col-lg-6 col-5 my-auto text-end">
              <div
                class="
                  icon icon-lg icon-shape-1
                  shadow-dark
                  text-center
                  border-radius-xl
                "
                :class="item.class"
              >
                <i class="material-icons opacity-10">{{ item.icon }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th
                    class="
                      text-uppercase text-secondary text-xxs
                      font-weight-bolder
                      opacity-7
                    "
                  >
                    Name
                  </th>
                   <th
                    class="
                     text-center text-uppercase text-secondary text-xxs
                      font-weight-bolder
                      opacity-7
                      ps-2
                    "
                  >
                    Created By
                  </th>
                  <th
                    class="
                     text-center text-uppercase text-secondary text-xxs
                      font-weight-bolder
                      opacity-7
                      ps-2
                    "
                  >
                    Created at
                  </th>
                  <th
                    class="
                      text-center text-uppercase text-secondary text-xxs
                      font-weight-bolder
                      opacity-7
                    "
                  >
                    Status
                  </th>
                  <th
                    class="
                      text-center text-uppercase text-secondary text-xxs
                      font-weight-bolder
                      opacity-7
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pendingMeter in pendingMeters" :key="pendingMeter.id">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <a class="mb-0 text-sm" @click="selectlist(pendingMeter.id)"
                          >{{pendingMeter.name}}</a
                        >
                      </div>
                    </div>
                  </td>
                    <td class="align-middle text-center text-sm">
                    <span class="text-xs font-weight-bold"> {{pendingMeter.created_by_name}} </span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="text-xs font-weight-bold"> {{pendingMeter.created_at}} </span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="text-xs font-weight-bold"> {{pendingMeter.status}} </span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <div class="dropdown">
                        <button class="btn btn-success dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-edit"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item">Pending</a>
                            <a class="dropdown-item" @click="changeStatus(pendingMeter.id, 1)">Approve</a>
                            <a class="dropdown-item" @click="changeStatus(pendingMeter.id, 2)">Delete</a>
                        </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!----------------Orders OverView-------------------->
    <div
      class="col-lg-4 col-md-6"
      v-for="item in listSelection"
      :key="item.id"
      v-show="select == item.meter_id"
    >
      <div class="card-1" style="height: 55vh; overflow: auto">
        <div class="card-header pb-0">
          <div class="d-flex justify-content-between">
            <div><h6>{{ item.meter_name }}</h6></div>
          </div>
          <p class="text-sm">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
            <span class="font-weight-bold">{{ item.device_serial_number }}</span>
          </p>
        </div>
        <div class="card-body">
          <div class="timeline timeline-one-side">
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-info text-gradient"
                  >shopping_cart</i
                >
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Installation Status
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  {{item.installation_status == 1 ? 'Attempted and installed' : 'Attempted but incomplete'}}
                </p>
              </div>
            </div>
               <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-success text-gradient"
                  >notifications</i
                >
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Device
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  {{item.device.name}}
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-danger text-gradient">code</i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Manufacturer
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                   {{item.device.manufacturer}}
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-warning text-gradient"
                  >credit_card</i
                >
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Device Type
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                   {{item.device.device_type}}
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-primary text-gradient">key</i>
              </span>
              <div class="timeline-content" v-if="item.installation_status == 2">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Reason
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  {{item.reason.options_reason_id}} - {{item.reason.text_reason}}
                </p>
              </div>
            </div>
            <!-- <div class="timeline-block">
              <span class="timeline-step">
                <i class="material-icons text-dark text-gradient">payments</i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  New order #9583120
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  17 DEC
                </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
export default {
  name: "report-content",
  extends: BaseComponentVue,
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.emitEvent("selected_property", null);
    });
  },
  data() {
    return {
      cardList: [
        {
          id: 1,
          name: "Pending Meter Type",
          icon: "weekend",
          class: "bg-gradient-dark",
          selected: false,
        },
        {
          id: 2,
          name: "Reports",
          icon: "person",
          class: "bg-gradient-primary",
          selected: false,
        },
        {
          id: 3,
          name: "Gallery",
          icon: "person",
          class: "bg-gradient-success",
          selected: false,
        },
        {
          id: 4,
          name: "Meters",
          icon: "weekend",
          class: "bg-gradient-info",
          selected: false,
        },
      ],
      listSelection: [],
      property: null,
      select: 0,
      step: 1,
      pendingMeters:[],
    };
  },
  mounted() {
    this.eventbus().$on("openSlide", (data) => {
      this.step = data;

      let index = this.cardList.findIndex((x) => x.id == data);
      if (index != -1) {
        for (var i = 0; i < this.cardList.length; i++) {
          this.cardList[i].selected = false;
        }
        this.cardList[index].selected = true;
      }
    });
    let index = this.listSelection.findIndex((x) => x.id == this.step);
    this.allPendingMeterType();
    this.pendingMeterInfo()
  },
  methods: {
    selectlist(num) {
      this.select = num;
    },

    async allPendingMeterType(){
        let res = await this.network().allPendingMeterTypeCard();
        this.pendingMeters = res;
        console.log(this.select)
    },

    async pendingMeterInfo(){
        let res = await this.network().pendingMeterInfo();
        this.listSelection = res;
    },
    
    async changeStatus(id, data){
        if(data == 1){
            let res = await this.network().updateMeter(id, {status: 1})
            console.log(res)
            this.utility().presentSuccessToast("Meter Type is approved successfully!");
            let resMeter = await this.network().allPendingMeterTypeCard();
            this.pendingMeters = [...resMeter];
            this.$emit('meter_approved', 'yes')
        }else{
            this.selectlist(id);
            this.$swal({
                title: "Delete Meter Type",
                text: "Are you sure to delete the Meter Type?",
                confirmButtonText: '<i class="fa fa-trash"></i> Delete',
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let res = await this.network().deleteMeter(id)
                    this.utility().presentSuccessToast("Meter Type is Deleted successfully!");
                    let resMeterDelete = await this.network().allPendingMeterTypeCard();
                    this.pendingMeters = [...resMeterDelete];
                    this.$emit('meter_delete', 'yes')
                }
            });
        }
    }
  },
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
.rounded-circle,
.avatar.rounded-circle img {
  border-radius: 50% !important;
}
.avatar {
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 50rem;
  height: 48px;
  width: 48px;
  transition: all 0.2s ease-in-out;
}
.avatar img {
  width: 100%;
}
.avatar + .avatar-content {
  display: inline-block;
  margin-left: 0.75rem;
}
.avatar.avatar-raised {
  margin-top: -24px;
}
.avatar.avatar-scale-up:hover {
  transform: scale(1.2);
}

.active .avatar.avatar-scale-up {
  transform: scale(1.2);
}

.avatar-xxl {
  width: 110px !important;
  height: 110px !important;
}
.avatar-xxl.avatar-raised {
  margin-top: -55px;
}

.avatar-xl {
  width: 74px !important;
  height: 74px !important;
}
.avatar-xl.avatar-raised {
  margin-top: -37px;
}

.avatar-lg {
  width: 58px !important;
  height: 58px !important;
  font-size: 0.875rem;
}
.avatar-lg.avatar-raised {
  margin-top: -29px;
}

.avatar-sm {
  width: 36px !important;
  height: 36px !important;
  font-size: 0.875rem;
}
.avatar-sm.avatar-raised {
  margin-top: -18px;
}

.avatar-xs {
  width: 24px !important;
  height: 24px !important;
  font-size: 0.75rem;
}
.avatar-xs.avatar-raised {
  margin-top: -12px;
}

.avatar-group .avatar {
  position: relative;
  z-index: 2;
  border: 2px solid #fff;
}
.avatar-group .avatar:hover {
  z-index: 3;
}

.avatar-group .avatar + .avatar {
  margin-left: -1rem;
}
.table thead th {
  padding: 0.75rem 1.5rem;
  text-transform: capitalize;
  letter-spacing: 0px;
  border-bottom: 1px solid #f0f2f5;
}

.table th {
  font-weight: 600;
}

.table td .progress {
  height: 3px;
  width: 120px;
  margin: 0;
}
.table td .progress .progress-bar {
  height: 3px;
}

.table td,
.table th {
  white-space: nowrap;
}

.table.align-items-center td,
.table.align-items-center th {
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-width: 0;
}

.table > :not(:last-child) > :last-child > * {
  border-bottom-color: #f0f2f5;
}

.table > :not(:first-child) {
  border-top: 1px solid currentColor;
}
.timeline-one-side .timeline-step {
  left: 1rem;
}
.timeline {
  position: relative;
}
.timeline:before {
  content: "";
  position: absolute;
  top: 0;
  left: 1rem;
  height: 100%;
  border-right: 2px solid #e5e5e5;
}
.timeline.timeline-dark:before {
  border-right-color: #4a4a4a;
}

.timeline-block {
  position: relative;
}
.timeline-block:after {
  content: "";
  display: table;
  clear: both;
}
.timeline-block:first-child {
  margin-top: 0;
}
.timeline-block:last-child {
  margin-bottom: 0;
}

.timeline-step {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  left: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  text-align: center;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: 600;
  z-index: 1;
}
.timeline-step svg,
.timeline-step i {
  line-height: 1.4;
}

.timeline-content {
  position: relative;
  margin-left: 45px;
  padding-top: 0.35rem;
  position: relative;
  top: -6px;
}
.timeline-content:after {
  content: "";
  display: table;
  clear: both;
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
  text-decoration: none;
  color: black;
  font-weight: 500;
  cursor: pointer;
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
